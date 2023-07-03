# 信号处理机制-外部信号需要重写ready方法将信号函数导入作为函数体
# pre_xxx 表示在xxx之前执行的操作
# post_xxx 表示在xxx之后执行的操作
from django.db.models.signals import pre_save, pre_delete, post_save, post_delete
from django.dispatch.dispatcher import receiver
from users.models import UserInfo, UserDesc


# 创建新用户保存之后，自动创建一个用户头像对象
@receiver(post_save, signal=UserInfo)
def create_user_desc_obj(sender, instance, **kwargs):
    # 如果当前保存成功的用户对象没有desc对象，则创建一个
    has_avatar = UserDesc.objects.filter(user=instance).first()
    if not has_avatar:
        UserDesc.objects.create(user=instance)
