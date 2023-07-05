from rest_framework.throttling import SimpleRateThrottle


# 匿名用户
class AnonymousThrottle(SimpleRateThrottle):
    scope = 'AnonymousUser'

    def get_cache_key(self, request, view):
        return self.get_ident(request)


# 超级用户
class SuperThrottle(SimpleRateThrottle):
    scope = 'super_user'

    def get_cache_key(self, request, view):
        return request.user.account
