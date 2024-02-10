from rest_framework.views import APIView
from django.http import JsonResponse
from utils.methods import return_response, get_data
from utils.create_log import create_logs


class BaseView(APIView):
    create_log = False
    models = None
    serializer = None
    allowed_methods = ['get', 'post', 'patch', 'delete']

    def get_queryset(self, request, *args, **kwargs):
        queryset = self.models.objects.all()
        return queryset

    def get(self, request, row_id=None):
        if 'get' not in self.allowed_methods:
            return JsonResponse(return_response(status=False, info='请求方法错误！'))
        queryset = self.get_queryset(request, row_id)
        data = get_data(queryset, True, request, self, self.serializer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request):
        if 'post' not in self.allowed_methods:
            return JsonResponse(return_response(status=False, info='请求方法错误！'))
        ser = self.serializer(data=request.data)
        if ser.is_valid():
            ser.save()
            if self.create_log:
                create_logs(request.user, self.models, 2, request.data)
            response = return_response(data=ser.data, info='添加操作成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id):
        if 'patch' not in self.allowed_methods:
            return JsonResponse(return_response(status=False, info='请求方法错误！'))
        queryset = self.models.objects.get(id=row_id)
        ser = self.serializer(instance=queryset, data=request.data)
        if ser.is_valid():
            ser.save()
            if self.create_log:
                create_logs(request.user, self.models, 3, request.data)
            response = return_response(data=ser.data, info='信息更新成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id):
        if 'delete' not in self.allowed_methods:
            return JsonResponse(return_response(status=False, info='请求方法错误！'))
        try:
            data = self.models.objects.filter(id=row_id).delete()
            if self.create_log:
                create_logs(request.user, self.models, 4, row_id)
            response = return_response(data=int(row_id), info=f'成功删除{data}条数据！')
        except self.models.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)
