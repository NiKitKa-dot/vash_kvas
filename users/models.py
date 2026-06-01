from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('customer', 'Покупатель'),
        ('seller', 'Продавец'),
        ('owner', 'Владелец'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=20, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/%Y/%m/%d', blank=True)
    bonus_points = models.IntegerField(default=0)
    encrypted_payment_info = models.TextField(blank=True)
    address = models.TextField(blank=True, verbose_name='Адрес доставки')

    def __str__(self):
        return f"Профиль {self.user.username}"


from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, role='customer')  # роль по умолчанию

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()