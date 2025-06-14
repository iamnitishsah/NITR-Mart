from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.core.exceptions import ValidationError


class CustomUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
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
    role = models.CharField(max_length=20)

    # for student
    year = models.CharField(max_length=10)
    branch = models.CharField(max_length=20)
    roll_no = models.CharField(max_length=15)

    # for faculty
    department = models.CharField(max_length=50, blank=True, null=True)

    # for admin
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'year', 'branch', 'roll_no']

    objects = CustomUserManager()

    def clean(self):
        super().clean()
        if self.email and not self.email.endswith('@nitrkl.ac.in'):
            raise ValidationError({'email': 'Only @nitrkl.ac.in email addresses are allowed.'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)