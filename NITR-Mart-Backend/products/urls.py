from django.urls import path
from .views import ProductListCreateView, ProductRetrieveUpdateView, ProductDeleteView

app_name = 'products'

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list-create'),
    path('<int:pk>/', ProductRetrieveUpdateView.as_view(), name='product-retrieve-update'),
    path('<int:pk>/delete/', ProductDeleteView.as_view(), name='product-delete'),
]