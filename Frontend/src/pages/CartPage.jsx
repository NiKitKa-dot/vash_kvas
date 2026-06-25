import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    api.get('/orders/cart/')
      .then(res => setCart(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCart(); }, []);

  const removeFromCart = (productId) => {
    api.post('/orders/cart/remove/', { product_id: productId })
      .then(() => fetchCart())
      .catch(err => console.error(err));
  };

  if (loading) return <div>Загрузка...</div>;
  if (!cart || cart.items?.length === 0) {
    return <div className="empty-cart"><h2>Корзина пуста</h2><Link to="/catalog">В каталог</Link></div>;
  }
  const total = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
  return (
    <div className="cart-page">
      <h2>Корзина</h2>
      {cart.items.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.product_detail?.name}</span>
          <span>{item.price} ₽ × {item.quantity}</span>
          <span>{item.price * item.quantity} ₽</span>
          <button onClick={() => removeFromCart(item.product)}>Удалить</button>
        </div>
      ))}
      <div>Итого: {total} ₽</div>
      <Link to="/checkout" className="checkout-btn">Оформить заказ</Link>
    </div>
  );
};

export default CartPage;