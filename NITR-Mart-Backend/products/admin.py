from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'seller', 'price', 'category', 'is_sold', 'posted_at')
    list_filter = ('category', 'is_sold', 'posted_at')
    search_fields = ('title', 'description', 'seller__username')
    readonly_fields = ('posted_at',)
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'seller')
        }),
        ('Pricing', {
            'fields': ('price', 'negotiable')
        }),
        ('Details', {
            'fields': ('image', 'category', 'is_sold', 'posted_at')
        }),
    )