from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField

CATEGORIES = [
    ('Electronics', 'Electronics'),
    ('Books & Study Materials', 'Books & Study Materials'),
    ('Hostel Essentials', 'Hostel Essentials'),
    ('Furniture', 'Furniture'),
    ('Sports & Fitness', 'Sports & Fitness'),
    ('Cycle & Transport', 'Cycle & Transport'),
    ('Room Decor', 'Room Decor'),
    ('Lab Equipment', 'Lab Equipment'),
    ('Others', 'Others')
]

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    negotiable = models.BooleanField(default=False)
    image = CloudinaryField('image', blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORIES, default='Others')
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products')
    is_sold = models.BooleanField(default=False)
    posted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-posted_at']

    def __str__(self):
        return self.title

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = CloudinaryField('image')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.product.title} ({self.id})"
