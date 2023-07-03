def return_response(status: bool = True, code: int = 200, data=None, info: str = '', error: str = ''):
    response = {
        'status': status,  # 请求状态
        'code': code,  # 请求标志 - 200/400
        'data': data,  # 请求内容 - dict
        'info': info,  # 提示信息 - str
        'errs': error  # 错误信息 - str
    }
    return response
