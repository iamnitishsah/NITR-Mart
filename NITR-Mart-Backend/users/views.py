from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import OTPVerification
from django.contrib.auth import get_user_model
from .serializers import (
    OTPSendSerializer,
    OTPVerifySerializer,
    UserSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
     PasswordResetConfirmSerializer
)

User = get_user_model()


class OTPSendView(generics.CreateAPIView):
    """
    View to send OTP to user's email for registration
    No authentication required
    """
    serializer_class = OTPSendSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'detail': 'OTP sent successfully'},
            status=status.HTTP_200_OK
        )


class OTPVerifyView(generics.CreateAPIView):
    """
    View to verify OTP before allowing registration
    No authentication required
    """
    serializer_class = OTPVerifySerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                'detail': 'OTP verified successfully',
                'email': serializer.data['email']
            },
            status=status.HTTP_200_OK
        )


class UserListCreateView(generics.ListCreateAPIView):
    """
    View to:
    - List all users (admin only)
    - Create new user (open with OTP verification)
    """
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def create(self, request, *args, **kwargs):
        """
        Custom create to ensure OTP verification before user creation
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get('email')
        otp = serializer.validated_data.get('otp')

        try:
            otp_obj = OTPVerification.objects.get(
                email=email,
                otp=otp,
                is_verified=True
            )
            if otp_obj.is_expired():
                otp_obj.delete()
                return Response(
                    {'detail': 'OTP has expired'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except OTPVerification.DoesNotExist:
            return Response(
                {'detail': 'Invalid or unverified OTP'},
                status=status.HTTP_400_BAD_REQUEST
            )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        otp_obj.delete()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class UserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """
    View to:
    - Retrieve user profile
    - Update user profile
    Requires authentication
    """
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Users can only access their own profile unless they're staff
        """
        if self.request.user.is_staff or self.request.user.is_superuser:
            return super().get_object()
        return self.request.user

    def update(self, request, *args, **kwargs):
        """
        Custom update to handle password changes securely
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        if 'password' in serializer.validated_data:
            if not serializer.validated_data.get('current_password'):
                return Response(
                    {'current_password': 'Current password is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if not instance.check_password(serializer.validated_data['current_password']):
                return Response(
                    {'current_password': 'Incorrect password'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            instance.set_password(serializer.validated_data['password'])

        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CurrentUserView(APIView):
    """
    View to get current authenticated user's profile
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PasswordResetConfirmView(generics.CreateAPIView):
    """
    POST: Confirm password reset and set new password.
    """
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [permissions.AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # This will set the new password
        return Response({'detail': 'Password reset successfully.'}, status=status.HTTP_200_OK)
    
    
class CheckEmailView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'detail': 'Email is registered.'}, status=status.HTTP_200_OK)
        return Response({'detail': 'Email is not registered.'}, status=status.HTTP_404_NOT_FOUND)