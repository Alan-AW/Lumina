import re
import datetime

from datetime import datetime, timedelta
from rest_framework.serializers import ValidationError
from utils.constant import tel_regex, password_regex


# 手机号 || 座机号验证
def tel_validate(value):
    if not re.match(tel_regex, value):
        raise ValidationError('手机号格式错误！')


# 密码强度验证
def password_validate(value):
    if not re.search(password_regex, value):
        raise ValidationError('密码长度为8-16且包含大写字母、小写字母、特殊符号、数字中的任意三项！！')


# 数量验证
def count_validate(value):
    try:
        float(value)
    except ValueError:
        raise ValidationError('数字格式错误！')


# 日期的计算(目标日期与今天的天数差距)
def computed_date(date: str, must_this_month: bool = True):
    today = datetime.today()
    if must_this_month:
        try:
            post_year, post_month, *args = date.split('-')
        except ValueError:
            raise ValidationError('日期格式错误：日期格式为 “Y-m-d”！')
        if int(post_year) != today.year or int(post_month) != today.month:
            raise ValidationError('指定的日期必须是本年本月的日期！')
    try:
        value = datetime.strptime(date, '%Y-%m-%d')
        diff = today - value
    except TypeError:
        raise ValidationError('日期格式错误：日期格式为 “Y-m-d”！')
    if diff.days < 0:
        raise ValidationError('日期格式错误：不能是未来的日期！')
    return diff.days + 1


# 文件大小的验证
def file_size_validate(file, allow_size=1024*1024):
    if file.size > allow_size:
        raise ValidationError(f'图片文件不得超过{allow_size}MB！')


def file_suffix_name_validate(file):
    allow_names = ['jpg', 'png', 'jpeg']
    suffix_name = file.name.split('.')[1]
    if suffix_name not in allow_names:
        raise ValidationError('文件格式错误！仅允许“.jpg .jpeg .png”格式的图片！')
