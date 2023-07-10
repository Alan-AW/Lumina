from django.db.models.signals import post_save, pre_delete
from django.dispatch.dispatcher import receiver
from upload_file.models import UploadFile


# 每当上传一个新文件，立马将他的文件名写入数据库
@receiver(post_save, sender=UploadFile)
def create_file_name(sender, instance, **kwargs):
    if not kwargs['created']:
        return None
    if not instance.file_name:
        instance.file_name = instance.file.name
        instance.save()
    else:
        return None


@receiver(pre_delete, sender=UploadFile)
def delete_file(sender, instance, **kwargs):
    instance.file.delete(False)
