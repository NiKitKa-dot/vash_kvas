from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer, AddToCartSerializer
from products.models import Product
from datetime import timedelta
from django.utils import timezone

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer #инъекция серилизатора
    permission_classes = [permissions.IsAuthenticated] #инъекция прав

    def get_queryset(self): #динамическая инъецкция
        # Пользователь видит только свои заказы, администратор – все
        if self.request.user.is_staff:
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer

    def perform_create(self, serializer):
        # Создаём заказ со статусом 'ordered' (оформление)
        serializer.save(user=self.request.user, status='ordered')

    @action(detail=False, methods=['get'], url_path='cart')
    def get_cart(self, request):
        """Получить или создать корзину текущего пользователя (статус 'cart')"""
        cart, created = Order.objects.get_or_create(
            user=request.user,
            status='cart',
            defaults={'delivery_address': '', 'contact_phone': ''}
        )
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='cart/add')
    def add_to_cart(self, request):
        """Добавить товар в корзину"""
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']

        product = get_object_or_404(Product, id=product_id, in_stock=True)
        cart, _ = Order.objects.get_or_create(
            user=request.user,
            status='cart',
            defaults={'delivery_address': '', 'contact_phone': ''}
        )
        # Проверим, есть ли уже такой товар в корзине
        order_item, created = OrderItem.objects.get_or_create(
            order=cart,
            product=product,
            defaults={'quantity': quantity, 'price': product.price}
        )
        if not created:
            order_item.quantity += quantity
            order_item.save()
        cart.update_total()
        return Response({'message': 'Товар добавлен в корзину'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='cart/remove')
    def remove_from_cart(self, request):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'error': 'product_id required'}, status=status.HTTP_400_BAD_REQUEST)
        cart = get_object_or_404(Order, user=request.user, status='cart')
        order_item = get_object_or_404(OrderItem, order=cart, product_id=product_id)
        order_item.delete()
        cart.update_total()
        return Response({'message': 'Товар удалён из корзины'})

    @action(detail=False, methods=['post'], url_path='cart/checkout')
    def checkout(self, request):
        cart = get_object_or_404(Order, user=request.user, status='cart')
        if cart.items.count() == 0:
            return Response({'error': 'Корзина пуста'}, status=status.HTTP_400_BAD_REQUEST)
        
        delivery_address = request.data.get('delivery_address')
        contact_phone = request.data.get('contact_phone')
        if not delivery_address or not contact_phone:
            return Response({'error': 'Укажите адрес и телефон'}, status=status.HTTP_400_BAD_REQUEST)
        
        cart.delivery_address = delivery_address
        cart.contact_phone = contact_phone
        cart.status = 'ordered'
        cart.estimated_delivery = timezone.now() + timedelta(days=5)  # через 5 дней
        cart.save()
        
        # Создаём новую пустую корзину для пользователя
        Order.objects.create(user=request.user, status='cart')
        
        return Response({
            'message': 'Заказ оформлен',
            'order_id': cart.id,
            'estimated_delivery': cart.estimated_delivery.isoformat()
        })