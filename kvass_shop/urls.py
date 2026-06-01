from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from products.views import SellerProductViewSet
from users.views import OwnerStatsView

router = DefaultRouter()
router.register(r'seller/products', SellerProductViewSet, basename='seller-products')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),   # обычные продукты (каталог)
    path('api/', include('orders.urls')),
    path('api/auth/', include('users.urls')),
    path('api/', include(router.urls)),
    path('api/owner/stats/', OwnerStatsView.as_view(), name='owner-stats'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)