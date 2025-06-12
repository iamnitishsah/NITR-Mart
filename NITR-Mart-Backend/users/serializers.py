from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone_number',
            'year', 'branch', 'roll_no', 'profile_picture', 'bio',
            'is_verified', 'created_at', 'updated_at', 'is_staff', 'is_superuser'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_verified', 'is_staff', 'is_superuser']

    def validate_email(self, value):
        if not value.endswith('@nitrkl.ac.in'):
            raise serializers.ValidationError('Only @nitrkl.ac.in email addresses are allowed.')
        return value

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = [
            'email', 'password', 'first_name', 'last_name', 'phone_number',
            'year', 'branch', 'roll_no', 'profile_picture', 'bio'
        ]

    def validate_email(self, value):
        if not value.endswith('@nitrkl.ac.in'):
            raise serializers.ValidationError('Only @nitrkl.ac.in email addresses are allowed.')
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, style={'input_type': 'password'})
    current_password = serializers.CharField(write_only=True, required=False, style={'input_type': 'password'})
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = User
        fields = [
            'email', 'password', 'current_password', 'first_name', 'last_name',
            'phone_number', 'year', 'branch', 'roll_no', 'profile_picture', 'bio'
        ]

    def validate(self, data):
        if 'password' in data and 'current_password' not in data:
            raise serializers.ValidationError({'current_password': 'Current password is required to update the password.'})
        if 'current_password' in data and not self.instance.check_password(data['current_password']):
            raise serializers.ValidationError({'current_password': 'Current password is incorrect.'})
        return data

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('current_password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance