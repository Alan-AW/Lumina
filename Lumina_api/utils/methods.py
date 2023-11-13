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


# 计算一个时间轴
def create_month_and_day_list(date):
    slowing_time = computed_sowing_time(date)
    date_list = [date + datetime.timedelta(days=i) for i in range(slowing_time)]
    new_date_list = [i.strftime('%m-%d') for i in date_list]
    return new_date_list


# 统计周期内每天的温度数据，求出每天的温度调档
def get_temperature_dict(queryset):
    temperature_dict = {}
    for row in queryset:
        moment = row.moment.strftime("%Y-%m-%d")
        if moment not in temperature_dict.keys():
            temperature_dict[moment] = []
        else:
            temperature_dict[moment].append(row.json_val)
    return temperature_dict


# 获取每一天的温度列表
def get_temperature_days_list(temperature_dict):
    values = temperature_dict.values()
    data = [[item for v in val for item in v] for val in values]
    return data


# 计算每一条的高中低温度
def get_max_center_min_temperature(list_item):
    # 计算0~21区间内的数字的比例
    range_0_21 = round(len([num for num in list_item if 0 <= num <= 21]) / len(list_item) * 100, 2)

    # 计算21~22.5区间内的数字的比例
    range_21_22_5 = round(len([num for num in list_item if 21 < num <= 22.5]) / len(list_item) * 100, 2)

    # 计算22.5~25区间内的数字的比例
    range_22_5_25 = round(len([num for num in list_item if 22.5 < num <= 25]) / len(list_item) * 100, 2)
    return {'high': range_22_5_25, 'midd': range_21_22_5, 'low': range_0_21}
