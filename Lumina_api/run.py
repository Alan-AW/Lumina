import os


def run():
    choices_help = """
        1.启动项目
        2.生成迁移文件
        3.迁移数据库
        4.清空数据库
        5.check一下
        请输入选择操作的序号：
    """
    command_pooling = [
        'python manage.py runserver',
        'python manage.py makemigrations',
        'python manage.py migrate',
        'python manage.py flush',
        'python manage.py check',
    ]
    value = input(choices_help)
    if not value:
        value = 1
    value = int(value)
    if not 0 < value < len(command_pooling) + 1:
        raise ValueError(f'this choices({value}) is not valid')
    os.system(command_pooling[value - 1])


if __name__ == '__main__':
    run()
