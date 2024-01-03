# 生成日志方法
from users.models import Logs


def create_logs(user_obj, model, command, data):
    """
    生成日志方法
    :param user_obj: 用户对象
    :param model: 模型对象
    :param command: 命令
    :param data: 数据
    :return: 日志对象
    """
    table_name = model._meta.db_table
    log_obj = Logs.objects.create(
        username=user_obj.account,
        role=user_obj.role.title,
        table_name=table_name,
        command=command,
        content=data
    )
    return log_obj
