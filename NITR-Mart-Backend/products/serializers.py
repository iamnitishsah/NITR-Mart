from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, CATEGORIES, ProductImage

User = get_user_model()

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    category = serializers.ChoiceField(choices=CATEGORIES)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'price', 'negotiable', 'images',
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
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    category = serializers.ChoiceField(choices=CATEGORIES)

    class Meta:
        model = Product
        fields = [
            'title', 'description', 'price', 'negotiable', 'images',
            'category'
        ]

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError('Price cannot be negative.')
        return value

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        validated_data['seller'] = self.context['request'].user
        product = Product.objects.create(**validated_data)
        for image in images_data:
            ProductImage.objects.create(product=product, image=image)
        return product

class ProductUpdateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    category = serializers.ChoiceField(choices=CATEGORIES, required=False)

    class Meta:
        model = Product
        fields = [
            'title', 'description', 'price', 'negotiable', 'images',
            'category', 'is_sold'
        ]
        read_only_fields = ['seller']

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError('Price cannot be negative.')
        return value

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)
        instance = super().update(instance, validated_data)
        if images_data is not None:
            # Delete existing images and add new ones
            instance.images.all().delete()
            for image in images_data:
                ProductImage.objects.create(product=instance, image=image)
        return instance
