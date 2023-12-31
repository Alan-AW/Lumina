from django.urls import path, re_path
from users.views import LoginView, UserInfoView, UpdateUserInfo, RolesView, PermissionView, LogsView

app_name = 'users'
urlpatterns = [
    # 登陆
    path('login', LoginView.as_view()),
    # 用户信息管理
    re_path(r'user/(?P<row_id>\d+)?$', UserInfoView.as_view()),
    # 修改个人信息
    path('update', UpdateUserInfo.as_view()),
    # 角色管理
    re_path(r'roles/(?P<row_id>\d+)?$', RolesView.as_view()),
    # 权限管理 || 统一生成菜单和权限 || choices
    re_path(r'permission/(?P<get_type>\w+)?$', PermissionView.as_view()),
    # 日志查看
    path('logs', LogsView.as_view()),
]
