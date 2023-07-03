from django.db import models


class UploadImg(models.Model):
    file_name = models.CharField(max_length=128, verbose_name='文件名', null=False, blank=False)
    file = models.ImageField(upload_to='upload/%Y/%m/%d', null=False, blank=False, verbose_name='图片文件')

    def __str__(self):
        return self.file.name

    class Meta:
        db_table = 'upload_file'
        verbose_name = '上传文件'
