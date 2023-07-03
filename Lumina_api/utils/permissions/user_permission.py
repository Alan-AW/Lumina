from rest_framework.permissions import BasePermission


class LoginPermission(BasePermission):
    # 登陆权限
    def has_permission(self, request, view):
        message = '先去登陆好嘛！'
        if not request.user.id:
            return False
        return True

