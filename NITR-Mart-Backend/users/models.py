from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
import re


class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, default='student')

    #for student profile
    year = models.CharField(max_length=10, blank=True, null=True)
    branch = models.CharField(max_length=10, blank=True, null=True)
    roll_no = models.CharField(max_length=15, blank=True, null=True)

    #for faculty profile
    department = models.CharField(max_length=10, blank=True, null=True)
    employee_id = models.CharField(max_length=15, blank=True, null=True)

    profile_picture = models.ImageField(upload_to='profile_pictures', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def clean(self):
        super().clean()

        if self.email and self.email.endswith('@nitrkl.ac.in'):
            raise ValueError("Email must be a valid NITRKL email address ending with @nitrkl.ac.in")