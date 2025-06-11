from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Product, Category, ProductImage
from .serializers import ProductSerializer, CategorySerializer, ProductImageSerializer


class ProductListCreateView(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        data = request.data.copy()

        category_id = data.get('category')
        if category_id:
            try:
                category = Category.objects.get(id=category_id)
                data['category'] = category.id
            except Category.DoesNotExist:
                return Response(
                    {'error': 'Category not found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = ProductSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            product = serializer.save(seller=request.user)

            images = request.FILES.getlist('images')
            for image in images:
                ProductImage.objects.create(product=product, image=image)

            response_serializer = ProductSerializer(product, context={'request': request})
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self, id):
        return get_object_or_404(Product, id=id)

    def get(self, request, id):
        product = self.get_object(id)
        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)

    def put(self, request, id):
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        product = self.get_object(id)

        if product.seller != request.user:
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )

        data = request.data.copy()

        category_id = data.get('category')
        if category_id:
            try:
                category = Category.objects.get(id=category_id)
                data['category'] = category.id
            except Category.DoesNotExist:
                return Response(
                    {'error': 'Category not found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = ProductSerializer(product, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            updated_product = serializer.save()

            if 'images' in request.FILES:

                images = request.FILES.getlist('images')
                for image in images:
                    ProductImage.objects.create(product=updated_product, image=image)

            response_serializer = ProductSerializer(updated_product, context={'request': request})
            return Response(response_serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        return self.put(request, id)

    def delete(self, request, id):
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        product = self.get_object(id)

        if product.seller != request.user:
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )

        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)