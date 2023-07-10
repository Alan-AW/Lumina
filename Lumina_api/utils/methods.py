from utils.pager.pager import NumberPageFunc
import datetime


def return_response(status: bool = True, code: int = 200, data=None, info: str = '', error: str = ''):
    response = {
        'status': status,  # 请求状态 - true/false
        'code': code,  # 请求标志 - int
        'data': data,  # 请求内容 - dict/list
        'info': info,  # 提示信息 - str
        'errs': error  # 错误信息 - str
    }
    return response


def get_data(model=None, is_query: bool = False, request=None, view=None, ser_class=None, many: bool = True):
    if many:
        if is_query:
            queryset = model.order_by('-id')
        else:
            queryset = model.objects.all().order_by('-id')
        pg = NumberPageFunc()
        page_obj = pg.paginate_queryset(queryset, request, view)
        ser = ser_class(page_obj, many=many)
        data = pg.get_paginated_response(ser.data)
    else:
        page_obj = model
        ser = ser_class(instance=page_obj, many=many)
        data = ser.data
    return data


# 计算作物播种时间
def computed_sowing_time(create_time):
    _today = datetime.datetime.today()
    d1 = datetime.datetime(_today.year, _today.month, _today.day)
    d2 = datetime.datetime(create_time.year, create_time.month, create_time.day)
    result = (d1 - d2).days or 1
    return result
