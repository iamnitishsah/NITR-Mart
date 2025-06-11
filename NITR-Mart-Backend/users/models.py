from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
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

        if self.email and not self.email.endswith('@nitrkl.ac.in'):
            raise ValidationError({'email': 'Only @nitrkl.ac.in email addresses are allowed.'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()