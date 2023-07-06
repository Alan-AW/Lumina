from django.db import models


class UploadFile(models.Model):
    file_name = models.CharField(max_length=128, verbose_name='文件名', null=False, blank=True)
    file = models.ImageField(upload_to='upload/%Y/%m/%d', null=False, blank=False, verbose_name='图片文件')

    def __str__(self):
        return self.file_name

    class Meta:
        db_table = 'upload_file'
        verbose_name = '上传文件'
