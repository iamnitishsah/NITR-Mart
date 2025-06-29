from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import OTPVerification, User

User = get_user_model()


class OTPSendSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        """Validate that email is from nitrkl.ac.in domain"""
        if not value.endswith('@nitrkl.ac.in'):
            raise serializers.ValidationError(
                'Only @nitrkl.ac.in email addresses are allowed.'
            )
        return value.lower()

    def create(self, validated_data):
        """Create and send OTP to user's email"""
        email = validated_data['email'].lower()

        # Check if user exists for this email
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'email': 'No user found with this email address.'}
            )

        OTPVerification.objects.filter(email=email).delete()

        otp_obj = OTPVerification.objects.create(email=email)

        subject = 'Your OTP for NITR Mart Password Reset' # Changed subject
        context = {
            'otp': otp_obj.otp,
            'expiry_minutes': getattr(settings, 'OTP_EXPIRY_MINUTES', 30), # Use getattr for default
        }

        html_message = render_to_string('otp_email.html', context)
        plain_message = strip_tags(html_message)

        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            html_message=html_message,
            fail_silently=False,
        )

        return otp_obj


class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        """Validate OTP against database"""
        email = data['email'].lower()
        otp = data['otp']

        try:
            otp_obj = OTPVerification.objects.get(
                email=email,
                otp=otp
            )
        except OTPVerification.DoesNotExist:
            raise serializers.ValidationError({
                'detail': 'Invalid OTP or email'
            })

        if otp_obj.is_expired():
            otp_obj.delete()
            raise serializers.ValidationError({
                'detail': 'OTP has expired'
            })

        if otp_obj.is_verified:
            # If already verified, no need to re-verify, just return
            data['otp_obj'] = otp_obj
            return data

        data['otp_obj'] = otp_obj
        return data

    def create(self, validated_data):
        """Mark OTP as verified"""
        otp_obj = validated_data['otp_obj']
        otp_obj.is_verified = True
        otp_obj.save()
        return otp_obj


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user profile viewing"""

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name',
            'year', 'branch', 'roll_no', 'is_verified',
            'created_at', 'updated_at', 'is_staff',
            'is_superuser', 'role', 'department', 'wp_number'
        ]
        read_only_fields = [
            'id', 'created_at', 'updated_at',
            'is_verified', 'is_staff', 'is_superuser'
        ]

    def validate_email(self, value):
        if not value.endswith('@nitrkl.ac.in'):
            raise serializers.ValidationError(
                'Only @nitrkl.ac.in email addresses are allowed.'
            )
        return value.lower()


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for user registration with OTP verification"""
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        min_length=8,
        help_text='Password must be at least 8 characters'
    )
    otp = serializers.CharField(
        write_only=True,
        required=True,
        max_length=6,
        help_text='6-digit OTP received via email'
    )

    class Meta:
        model = User
        fields = [
            'email', 'password', 'otp',
            'first_name', 'last_name', 'year',
            'branch', 'roll_no', 'role', 'department', 'wp_number'
        ]
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, data):
        """Validate OTP and role-specific fields"""
        email = data.get('email', '').lower()
        otp = data.get('otp')
        role = data.get('role', 'student')

        try:
            otp_obj = OTPVerification.objects.get(
                email=email,
                otp=otp,
                is_verified=True
            )
        except OTPVerification.DoesNotExist:
            raise serializers.ValidationError({
                'otp': 'Invalid or unverified OTP'
            })

        if otp_obj.is_expired():
            otp_obj.delete()
            raise serializers.ValidationError({
                'otp': 'OTP has expired'
            })

        # Role-specific validation
        if role == 'student' and not all([data.get('year'), data.get('branch')]):
            raise serializers.ValidationError({
                'detail': 'Year and branch are required for students'
            })
        elif role == 'faculty' and not data.get('department'):
            raise serializers.ValidationError({
                'detail': 'Department is required for faculty'
            })

        return data

    def create(self, validated_data):
        """Create user after OTP verification"""
        validated_data.pop('otp')

        validated_data['email'] = validated_data['email'].lower()

        user = User.objects.create_user(**validated_data)

        user.is_verified = True
        user.save()

        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""
    password = serializers.CharField(
        write_only=True,
        required=False,
        style={'input_type': 'password'},
        min_length=8
    )
    current_password = serializers.CharField(
        write_only=True,
        required=False,
        style={'input_type': 'password'}
    )
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = User
        fields = [
            'email', 'password', 'current_password',
            'first_name', 'last_name', 'year',
            'branch', 'roll_no', 'department', 'wp_number'
        ]

    def validate(self, data):
        """Validate password change"""
        password = data.get('password')
        current_password = data.get('current_password')

        if password and not current_password:
            raise serializers.ValidationError({
                'current_password': 'Current password is required to change password'
            })

        if current_password and not self.instance.check_password(current_password):
            raise serializers.ValidationError({
                'current_password': 'Current password is incorrect'
            })

        return data

    def update(self, instance, validated_data):
        """Update user instance"""
        password = validated_data.pop('password', None)
        validated_data.pop('current_password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance


class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    new_password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=8,
        style={'input_type': 'password'},
        help_text='New password must be at least 8 characters'
    )
    confirm_password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=8,
        style={'input_type': 'password'},
        help_text='Confirm new password'
    )
    def validate(self, data):
        email = data.get('email')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({'email': 'No user found with this email address.'})
        if new_password != confirm_password:
            raise serializers.ValidationError({'confirm_password': 'New password and confirm password do not match.'})
        data['user'] = user
        return data
