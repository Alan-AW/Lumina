import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-@5sg0tm)3z00a5syf88n74udw5n$r%zwgbd8h^osmhlo7mbs2&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# DEBUG = False

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'simpleui',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'users.apps.UsersConfig',
    'operations.apps.OperationsConfig',
    'android.apps.AndroidConfig',
    'device.apps.DeviceConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Lumina_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Lumina_api.wsgi.application'

# Database
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mqsw',
        'USER': 'mqsw',
        'PASSWORD': 'HTHY6JbPMF5AxHKc',
        'HOST': '47.110.240.100',
        'POST': 3306,
        'OPTIONS': {'charset': 'utf8mb4'}
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'zh-Hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = 'static'

# 设置修改文件的保存路径
MEDIA_ROOT = os.path.join(BASE_DIR, 'media').replace('\\', '/')

# 设置文件访问的统一路由
MEDIA_URL = '/media/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# 跨域
CORS_ORIGIN_ALLOW_ALL = True

# API_BASE_URL = 'http://127.0.0.1:8000'
API_BASE_URL = 'http://lumina.toriches.cn'

REST_FRAMEWORK = {
    # 认证
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'utils.authentication.jwt_auth.JwtAuthentication',
    ],
    # 权限
    'DEFAULT_PERMISSION_CLASSES': [
        'utils.permissions.user_permission.LoginPermission',
    ],
    # 节流
    'DEFAULT_THROTTLE_CLASSES': [
        'utils.throttle.throttle.AnonymousThrottle',
        'utils.throttle.throttle.SuperThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'AnonymousUser': '5/s',  # 匿名用户
        'super_user': '20/s',
    },
    # 解析器
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FileUploadParser',
    ],
    # 渲染器
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}

# 隐藏右侧SimpleUI广告链接和使用分析
SIMPLEUI_HOME_INFO = False
SIMPLEUI_ANALYSIS = False

# 设置默认主题，指向主题css文件名。
# Element-ui风格
SIMPLEUI_DEFAULT_THEME = 'element.css'
# layui风格
# SIMPLEUI_DEFAULT_THEME = 'layui.css'
# Admin Lte风格
# SIMPLEUI_DEFAULT_THEME = 'admin.lte.css'

# admin后台title相关配置
ADMIN_SITE_HEADER = '后台'  # 设置后台登陆页Title和登陆成功之后左侧导航栏title
ADMIN_SITE_TITLE = '墨泉生物系统后台'  # 设置后台网页title
ADMIN_SITE_INDEX_TITLE = '首页'
