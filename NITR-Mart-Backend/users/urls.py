from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserListCreateView,
    UserRetrieveUpdateView,
    CurrentUserView,
    OTPSendView,
    OTPVerifyView,
)

app_name = 'users'

urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('<int:pk>/', UserRetrieveUpdateView.as_view(), name='user-retrieve-update'),
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('send-otp/', OTPSendView.as_view(), name='send-otp'),
    path('verify-otp/', OTPVerifyView.as_view(), name='verify-otp'),

]

