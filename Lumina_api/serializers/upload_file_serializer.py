from django.conf import settings as sys
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from upload_file.models import UploadImg
from utils.validator.public_validate import file_size_validate, file_suffix_name_validate


class UploadFileSer(serializers.ModelSerializer):
    file_name = serializers.CharField(
        write_only=True,
        validators=[
            UniqueValidator(
                queryset=UploadImg.objects.all(),
                message='文件名重复！'
            )
        ], required=True, error_messages={'required': '无法读取文件名！请稍后再试！'}
    )
    file = serializers.ImageField(
        write_only=True,
        validators=[file_size_validate, file_suffix_name_validate], required=True,
        error_messages={'required': 'Oh! shit! what! are! you! fucking! doing!?'},
        use_url=False, max_length=None
    )
    view_url = serializers.SerializerMethodField()
    value_url = serializers.ImageField(source='img', read_only=True)

    def get_view_url(self, row):
        try:
            url = sys.API_BASE_URL + row.img.url
        except ModuleNotFoundError:
            url = ''
        return url

    class Meta:
        model = UploadImg
        fields = '__all__'
