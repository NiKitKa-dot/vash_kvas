import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    delivery_address: '',
    contact_phone: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Загружаем корзину
    api.get('/orders/cart/')
      .then(res => setCart(res.data))
      .catch(err => {
        console.error(err);
        navigate('/cart');
      })
      .finally(() => setLoading(false));

    // Загружаем профиль для автозаполнения
    api.get('/auth/profile/')
      .then(res => {
        const profile = res.data.profile;
        if (profile) {
          setFormData(prev => ({
            delivery_address: profile.address || '',
            contact_phone: profile.phone || ''
          }));
        }
      })
      .catch(err => console.error('Ошибка загрузки профиля', err));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.delivery_address || !formData.contact_phone) {
      alert('Заполните все поля');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/orders/cart/checkout/', formData);
      alert('✅ Заказ оформлен! Доставка через 5 дней.');
      navigate('/profile/orders');
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка оформления');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!cart || cart.items?.length === 0) {
    return <div className="empty">Корзина пуста. <button onClick={() => navigate('/catalog')}>В каталог</button></div>;
  }

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <h1>Оформление заказа</h1>
      <div className="checkout-container">
        <div className="order-summary">
          <h3>Ваш заказ</h3>
          {cart.items.map(item => (
            <div key={item.id} className="checkout-item">
              <span>{item.product_detail?.name} x {item.quantity}</span>
              <span>{item.price * item.quantity} ₽</span>
            </div>
          ))}
          <div className="total">Итого: {total} ₽</div>
        </div>
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Куда доставить?</h3>
          <input
            type="text"
            name="delivery_address"
            placeholder="Адрес доставки"
            value={formData.delivery_address}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contact_phone"
            placeholder="Контактный телефон"
            value={formData.contact_phone}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Оформление...' : 'Подтвердить заказ'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;