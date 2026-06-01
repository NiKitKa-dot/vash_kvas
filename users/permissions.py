from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """Разрешение только для администраторов."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.profile.role == 'admin'

class IsOwnerOrAdmin(permissions.BasePermission):
    """Разрешение для владельца объекта или администратора."""
    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        # Предполагаем, что у объекта есть поле user или author
        owner = getattr(obj, 'user', None) or getattr(obj, 'author', None)
        return owner == request.user or request.user.profile.role == 'admin'