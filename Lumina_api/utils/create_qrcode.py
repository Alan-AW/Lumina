import os
import json
import qrcode
import time
from django.conf import settings as sys


def create_qr_code(data: str, file_name: str):
    try:
        data = json.dumps({'qrcode': data})
        image = qrcode.make(data)
    except Exception as e:
        raise ValueError(str(e))
    os.makedirs(f'{sys.MEDIA_ROOT}/users/qrcode/', exist_ok=True)  # 自动创建dir
    media_dir = '/media'
    save_path = f'/users/qrcode/{file_name}_{str(time.time()).split(".")[0]}.png'
    paths = f'{sys.BASE_DIR}{media_dir}{save_path}'
    image.save(paths)
    return save_path
