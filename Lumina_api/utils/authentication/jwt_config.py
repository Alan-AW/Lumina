import datetime
from django.utils.module_loading import import_string
from django.conf import settings as sys

# 用户表配置
UserInfo = import_string('users.models.UserInfo')

# jwt认证配置
JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),  # jwt过期时间
    "JWT_AUTH_HEADER_PREFIX": 'JWT'  # 请求头中的前缀
}

# jwt认证方式
JWT_AUTH_PORT = None  # 默认为请求头认证
# JWT_AUTH_PORT = 'Cookie'       # cookie认证
JWT_AUTH_COOKIE_KEY = 'JWT_TOKEN'  # cookie认证的key

# JWT_AUTH_PORT = 'Get'       # get认证
JWT_AUTH_GET_KEY = 'AUTH_TOKEN'  # get认证的key

# 加盐
SECRET_KEY = sys.SECRET_KEY

# token开头
TOKEN_START = 'JWT '
