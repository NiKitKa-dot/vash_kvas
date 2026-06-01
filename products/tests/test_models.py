# файл для проверки на создание товара
from django.test import TestCase
from django.contrib.auth import get_user_model
from products.models import Category, Product

User = get_user_model()

class ProductModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='seller', password='pass')
        self.category = Category.objects.create(name='Традиционный', slug='trad')

    def test_product_creation(self):
        product = Product.objects.create(
            name='Квас тестовый',
            slug='test-kvass',
            category=self.category,
            price=150,
            volume=1.0,
            color='light',
            sweetness='sweet',
            seller=self.user
        )
        self.assertEqual(product.name, 'Квас тестовый')
        self.assertTrue(product.in_stock)
        self.assertEqual(str(product), 'Квас тестовый')