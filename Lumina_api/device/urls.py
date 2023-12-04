from django.urls import path
from device.views import SendMessage

app_name = 'device'
urlpatterns = [
    path('send/msg', SendMessage.as_view())
]
