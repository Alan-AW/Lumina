from django.db.models.signals import pre_save, post_save, pre_delete
from django.dispatch.dispatcher import receiver
from django.db.transaction import atomic
from users.models import UserInfo, UserAvatar
from utils.authentication.jwt_auth import create_jwt_token
from utils.create_qrcode import create_qr_code


# 创建新用户保存之后，自动创建一个二维码
@receiver(post_save, sender=UserInfo)
def create_user_avatar_obj(sender, instance, **kwargs):
    if not kwargs['created']:
        return None
    try:
        with atomic():
            qrcode = create_jwt_token({'key': instance.account}, start='qrcode')
            instance.qrcode = qrcode
            qrcode_path = create_qr_code(qrcode, instance.account)
            UserAvatar.objects.create(user=instance, qrcode=qrcode_path)
            instance.save()
    except Exception as e:
        sender.objects.filter(pk=instance.id).delete()


# 删除用户时自动删除对应的图片文件(二维码文件无法这样删除，需要手动删除)
@receiver(pre_delete, sender=UserInfo)
def delete_users_avatar(sender, instance, **kwargs):
    # return None
    try:
        instance.avatar.avatar.delete(False)
        instance.avatar.qrcode.delete(False)
    except Exception:
        return None


# 更新头像或者账户之前自动删除用户原来的头像图片文件
@receiver(pre_save, sender=UserAvatar)
def update_users_avatar(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        user_obj = sender.objects.get(pk=instance.pk)
        old_avatar = user_obj.avatar
    except sender.DoesNotExist:
        return
    if old_avatar and old_avatar != instance.avatar:
        old_avatar.delete(save=False)
