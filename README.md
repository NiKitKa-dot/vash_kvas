# Vash-Kvas – интернет-магазин кваса

Это веб-приложение для продажи кваса с использованием Django REST Framework (бэкенд) и React (фронтенд). Реализованы: JWT-аутентификация, ролевая модель (покупатель, продавец, владелец), каталог с пагинацией и фильтрацией, корзина, оформление заказов, управление товарами продавцом, статистика владельца.

## Технологии

- **Backend:** Django 6, Django REST Framework, Simple JWT, SQLite
- **Frontend:** React 18, Vite, React Router, Axios
- **Документация API:** Swagger (drf-spectacular)

## Установка и запуск

### Бэкенд
```bash
cd kvass_shop
python -m venv venv
source venv/bin/activate  # или venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
