from django.db import models
from django.conf import settings
from products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('cart', 'Корзина'),
        ('ordered', 'Заказ оформлен'),
        ('processing', 'В обработке'),
        ('ready', 'Готов к отправке'),
        ('in_transit', 'В пути'),
        ('delivered', 'Доставлен'),
        ('cancelled', 'Отменён'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='cart')
    delivery_address = models.TextField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    estimated_delivery = models.DateTimeField(null=True, blank=True)
    courier_contact = models.CharField(max_length=100, blank=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    estimated_delivery = models.DateTimeField(null=True, blank=True)
    
    def update_total(self):
        total = sum(item.price * item.quantity for item in self.items.all())
        self.total_price = total
        self.save(update_fields=['total_price'])

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # цена на момент добавления

    def save(self, *args, **kwargs):
        if not self.price:
            self.price = self.product.price
        super().save(*args, **kwargs)
        self.order.update_total()