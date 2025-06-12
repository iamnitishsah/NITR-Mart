from django.urls import path
from .views import ProductListCreateView, ProductRetrieveUpdateView

app_name = 'products'

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list-create'),
    path('<int:pk>/', ProductRetrieveUpdateView.as_view(), name='product-retrieve-update'),
]