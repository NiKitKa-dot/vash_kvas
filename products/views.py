from rest_framework import viewsets, filters, permissions, views
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django_filters import NumberFilter, CharFilter
from .models import Product, Category
from .serializers import ProductSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ProductCreateUpdateSerializer, ProductSellerListSerializer, CategorySerializer
import random


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]   # обязательно список!


class ProductFilter(FilterSet):
    # Фильтр по нескольким значениям объема (lookup_expr='in')
    volume__in = CharFilter(method='filter_volume_in')
    # Фильтр по нескольким цветам
    color__in = CharFilter(method='filter_color_in')
    # Фильтр по максимальной цене
    price__lte = NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['color', 'sweetness', 'volume']

    def filter_volume_in(self, queryset, name, value):
        # value приходит как строка "0.5,1,2"
        volumes = value.split(',')
        # Преобразуем в числа (так как volume DecimalField)
        try:
            volumes_float = [float(v) for v in volumes]
        except ValueError:
            return queryset.none()
        return queryset.filter(volume__in=volumes_float)

    def filter_color_in(self, queryset, name, value):
        colors = value.split(',')
        return queryset.filter(color__in=colors)

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(in_stock=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter  # используем кастомный фильтр
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'name']

class IsSeller(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.profile.role == 'seller'

class SellerProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSeller]   # список!
    serializer_class = ProductCreateUpdateSerializer

    def get_queryset(self):
        return Product.objects.filter(seller=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductSellerListSerializer
        return ProductCreateUpdateSerializer

    def perform_create(self, serializer):
        default_category, _ = Category.objects.get_or_create(name='Традиционный', slug='traditional')
        serializer.save(seller=self.request.user, category=default_category)

    @action(detail=False, methods=['get'], url_path='sales')
    def sales_stats(self, request):
        products = self.get_queryset()
        data = []
        for p in products:
            data.append({
                'product_id': p.id,
                'product_name': p.name,
                'sales_count': random.randint(1, 500)   # случайное число продаж
            })
        return Response(data)

