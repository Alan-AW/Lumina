from rest_framework.permissions import BasePermission


class LoginPermission(BasePermission):
    # 登陆权限
    def has_permission(self, request, view):
        message = '先去登陆好嘛！'
        if not request.user.id:
            return False
        return True


class SuperPermission(BasePermission):
    # 超级OR管理 权限
    def has_permission(self, request, view):
        message = '无权访问！'
        return request.user.is_super or request.user.role.title == '超级管理员'


class ExcludeSuperPermission(BasePermission):
    # 非 超级管理 权限
    def has_permission(self, request, view):
        message = '无权访问！'
        return not request.user.is_super
