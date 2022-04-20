from django.urls import path
from server.auth_app.views import UserCreate, LoginUserView
from .signals import *


urlpatterns = [
    path('register/', UserCreate.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
]
