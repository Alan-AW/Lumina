import datetime, jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from utils.authentication import jwt_config
from utils.methods import return_response


class JwtAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # 非登录页面需要校验token
        auth = get_auth(request)
        if not auth:
            response = return_response(status=False, code=403, error='未获取到token!')
            raise exceptions.AuthenticationFailed(response)
        if auth[0].lower() != jwt_config.TOKEN_START.lower().strip():
            response = return_response(status=False, code=403, error='token认证方式错误!')
            raise exceptions.AuthenticationFailed(response)
        if len(auth) == 1:
            response = return_response(status=False, code=403, error='非法的token!')
            raise exceptions.AuthenticationFailed(response)
        elif len(auth) > 2:
            response = return_response(status=False, code=403, error='非法的token!')
            raise exceptions.AuthenticationFailed(response)

        token = auth[1]
        result = parse_payload(token)
        if not result['status']:
            raise exceptions.AuthenticationFailed(result)
        user_obj = jwt_config.UserInfo.objects.filter(id=result['data']['id']).first()
        if not user_obj:
            result = return_response(status=False, code=403, error='无权的token!')
            raise exceptions.AuthenticationFailed(result)
        return user_obj, token


def get_auth(request):
    authorization = request.META.get('HTTP_AUTHORIZATION', '')
    if jwt_config.JWT_AUTH_PORT:
        if jwt_config.JWT_AUTH_PORT == 'Cookie':
            authorization = request.COOKIES.get(jwt_config.JWT_AUTH_COOKIE_KEY)
        if jwt_config.JWT_AUTH_PORT == 'Get':
            authorization = request.query_params.get(jwt_config.JWT_AUTH_GET_KEY)
    auth = authorization.split()
    return auth


def create_jwt_token(payload, start: str = jwt_config.TOKEN_START, timeout=7):
    # 创建jwt token
    SALT = jwt_config.SECRET_KEY  # 加盐
    payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(days=timeout)
    token = start + jwt.encode(payload, SALT, algorithm="HS256")
    return token


def parse_payload(token):
    """
    对token进行发行校验并获取payload
    :param token:
    :return:
    """
    try:
        verified_payload = jwt.decode(token, jwt_config.SECRET_KEY, algorithms=["HS256"])
        result = return_response(data=verified_payload)
    except exceptions.NotAcceptable:
        result = return_response(status=False, error='token已失效!')
    except jwt.DecodeError:
        result = return_response(status=False, error='token认证失败!')
    except jwt.InvalidTokenError:
        result = return_response(status=False, error='非法的token!')
    return result
