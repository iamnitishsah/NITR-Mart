from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User


@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'first_name', 'last_name', 'is_staff', 'is_verified']
    list_filter = ['is_staff', 'is_superuser', 'is_verified', 'branch', 'year']
    search_fields = ['email', 'first_name', 'last_name', 'roll_no']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {
            'fields': ('first_name', 'last_name', 'phone_number', 'year', 'branch', 'roll_no', 'bio', 'profile_picture')
        }),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'is_verified', 'groups', 'user_permissions')
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'year', 'branch', 'roll_no', 'password1', 'password2'),
        }),
    )

    readonly_fields = ('created_at', 'updated_at')
