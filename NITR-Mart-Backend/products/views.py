from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductCreateSerializer, ProductUpdateSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_sold=False)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateSerializer
        return ProductSerializer

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def create(self, request, *args, **kwargs):
        images = request.FILES.getlist('images')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save(seller=request.user)
        if images:
            product.image = images[0]
            product.save(update_fields=['image'])
        for image in images:
            ProductImage.objects.create(product=product, image=image)
        headers = self.get_success_headers(serializer.data)
        return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED, headers=headers)

class ProductRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if self.request.user != obj.seller and not (self.request.user.is_staff or self.request.user.is_superuser):
            self.permission_denied(self.request, message="You can only edit your own products.")
        return obj

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        images = request.FILES.getlist('images')
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if images:
            instance.images.all().delete()
            instance.image = images[0]
            instance.save(update_fields=['image'])
            for image in images:
                ProductImage.objects.create(product=instance, image=image)
        return Response(ProductSerializer(instance).data, status=status.HTTP_200_OK)

class ProductDeleteView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        if self.request.user != instance.seller and not (self.request.user.is_staff or self.request.user.is_superuser):
            self.permission_denied(self.request, message="You can only delete your own products.")
        instance.delete()
