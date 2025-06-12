from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, CATEGORIES

User = get_user_model()

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)
    category = serializers.ChoiceField(choices=CATEGORIES)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'price', 'negotiable', 'image',
            'category', 'seller', 'is_sold', 'posted_at'
        ]
        read_only_fields = ['id', 'seller', 'posted_at', 'is_sold']

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError('Price cannot be negative.')
        return value

class ProductCreateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    category = serializers.ChoiceField(choices=CATEGORIES)

    class Meta:
        model = Product
        fields = [
            'title', 'description', 'price', 'negotiable', 'image',
            'category'
        ]

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError('Price cannot be negative.')
        return value

    def create(self, validated_data):
        validated_data['seller'] = self.context['request'].user
        return Product.objects.create(**validated_data)

class ProductUpdateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    category = serializers.ChoiceField(choices=CATEGORIES, required=False)

    class Meta:
        model = Product
        fields = [
            'title', 'description', 'price', 'negotiable', 'image',
            'category', 'is_sold'
        ]
        read_only_fields = ['seller']

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError('Price cannot be negative.')
        return value