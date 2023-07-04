from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = '用户管理'

    def ready(self):
        from signals.user_info_signal import create_user_avatar_obj, update_users_avatar, delete_users_avatar
