from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from django.utils.translation import gettext_lazy as _


class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ('email', 'username', 'first_name', 'last_name', 'role', 'is_staff', 'is_verified')
    list_filter = ('role', 'is_staff', 'is_active', 'is_verified')

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        (_('Personal info'), {
            'fields': ('first_name', 'last_name', 'bio', 'profile_picture', 'year', 'branch', 'roll_no', 'department', 'employee_id')
        }),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions', 'is_verified')
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password1', 'password2', 'role', 'is_verified', 'is_active', 'is_staff')}
        ),
    )

    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)
