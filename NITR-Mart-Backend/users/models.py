from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.core.exceptions import ValidationError
import random
from django.utils import timezone
from django.conf import settings



class OTPVerification(models.Model):
    email = models.EmailField(unique=True, db_index=True)
    otp = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(db_index=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.otp = f"{random.randint(0, 999999):06d}"
            self.expires_at = timezone.now() + timezone.timedelta(
                minutes=getattr(settings, 'OTP_EXPIRY_MINUTES', 30)
            )
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.expires_at

    def is_valid(self):
        """Check if OTP is both verified and not expired"""
        return not self.is_expired() and self.is_verified

    def __str__(self):
        return f"{self.email} - {self.otp} ({'Verified' if self.is_verified else 'Pending'})"


class CustomUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not email.endswith('@nitrkl.ac.in'):
            raise ValueError('Only @nitrkl.ac.in email addresses are allowed.')
        if not password:
            raise ValueError('The Password field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, default="student")

    # Student fields
    year = models.CharField(max_length=10, blank=True, null=True)
    branch = models.CharField(max_length=50, blank=True, null=True)
    roll_no = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        unique=True,
        error_messages={
            'unique': 'This roll number is already registered.'
        }
    )

    # Faculty fields
    department = models.CharField(max_length=50, blank=True, null=True)

    # Admin fields
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def clean(self):
        super().clean()
        if self.email and not self.email.endswith('@nitrkl.ac.in'):
            raise ValidationError({'email': 'Only @nitrkl.ac.in email addresses are allowed.'})

        if self.role == 'student' and not (self.year and self.branch):
            raise ValidationError('Year and branch are required for students')
        elif self.role == 'faculty' and not self.department:
            raise ValidationError('Department is required for faculty')

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email