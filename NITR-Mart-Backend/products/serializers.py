from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, CATEGORIES

User = get_user_model()

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False, allow_null=True)
    category = serializers.ChoiceField(choices=CATEGORIES)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'price', 'negotiable', 'image',
            'category', 'seller', 'is_sold', 'posted_at'
        ]
        read_only_fields = ['id', 'seller', 'posted_at', 'is_sold']

    def get_seller(self, obj):
        return {
            "email": obj.seller.email,
            "name": f"{obj.seller.first_name} {obj.seller.last_name}",
            "roll_number": obj.seller.roll_no,
            "wp_number": obj.seller.wp_number
        }

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