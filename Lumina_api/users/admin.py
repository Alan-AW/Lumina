from django.contrib import admin
from django.conf import settings as sys

admin.site.site_header = sys.ADMIN_SITE_HEADER
admin.site.site_title = sys.ADMIN_SITE_TITLE
admin.site.index_title = sys.ADMIN_SITE_INDEX_TITLE
