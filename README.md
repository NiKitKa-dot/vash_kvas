# Vash-Kvas – интернет-магазин кваса

Это веб-приложение для продажи кваса с использованием Django REST Framework (бэкенд) и React (фронтенд). Реализованы: JWT-аутентификация, ролевая модель (покупатель, продавец, владелец), каталог с пагинацией и фильтрацией, корзина, оформление заказов, управление товарами продавцом, статистика владельца.

## Технологии

- **Backend:** Django 6, Django REST Framework, Simple JWT, SQLite
- **Frontend:** React 18, Vite, React Router, Axios
- **Документация API:** Swagger (drf-spectacular)

## Установка и запуск

### Бэкенд

cd kvass_shop
python -m venv venv
source venv/bin/activate  # или venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

### Фронтенд

cd frontend
npm install
npm run dev


После запуска сайт доступен по адресу http://localhost:5173

API – http://localhost:8000/api/

документация Swagger – http://localhost:8000/api/docs/

## График активности
<img width="454" height="220" alt="image" src="https://github.com/user-attachments/assets/61b8f8f5-63e8-4c43-a17d-80f04f123a06" />

## Тепловая карта
