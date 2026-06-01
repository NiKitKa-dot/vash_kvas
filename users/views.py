from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserWithProfileSerializer, ProfileSerializer
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission
from orders.models import Order

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserWithProfileSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile

    def get(self, request, *args, **kwargs):
        serializer = UserWithProfileSerializer(request.user)
        return Response(serializer.data)
    
class IsOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.profile.role == 'owner'

class OwnerStatsView(APIView):
    permission_classes = [IsOwner]

    def get(self, request):
        total_users = User.objects.count()
        sellers_count = User.objects.filter(profile__role='seller').count()
        total_orders = Order.objects.exclude(status='cart').count()
        total_sales = sum(order.total_price for order in Order.objects.exclude(status='cart'))
        weekly_sales = [1200, 2300, 1800, 3400, 2900, 4100, 3800]   # статичная заглушка
        return Response({
            'total_users': total_users,
            'sellers_count': sellers_count,
            'total_orders': total_orders,
            'total_sales': total_sales,
            'weekly_sales': weekly_sales,
        })