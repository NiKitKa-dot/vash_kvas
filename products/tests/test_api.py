#проверка API товаровpython manage.py test
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from products.models import Category, Product

User = get_user_model()

class ProductAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='pass')
        self.category = Category.objects.create(name='Cat', slug='cat')
        self.product = Product.objects.create(
            name='Kvass', slug='kvass', category=self.category,
            price=100, volume=1.0, color='light', sweetness='sweet', seller=self.user
        )

    def test_list_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 1)