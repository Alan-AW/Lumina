from rest_framework.views import APIView
from django.http import JsonResponse
from utils.methods import return_response, get_data


class BaseView(APIView):
    models = None
    serializer = None
    get_filter = None

    def get(self, request, row_id=None):
        if self.get_filter:
            queryset = self.models.objects.filter(**{f'{self.get_filter}': row_id}).all()
            data = get_data(queryset, True, request, self, self.serializer)
        else:
            data = get_data(self.models, False, request, self, self.serializer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request):
        ser = self.serializer(data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='添加操作成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id):
        queryset = self.models.objects.get(id=row_id)
        ser = self.serializer(instance=queryset, data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='信息更新成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id):
        try:
            data = self.models.objects.filter(id=row_id).delete()
            response = return_response(data=int(row_id), info=f'成功删除{data}条数据！')
        except self.models.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)
