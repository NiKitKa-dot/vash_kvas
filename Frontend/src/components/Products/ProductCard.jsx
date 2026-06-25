import React, { useState } from 'react';
import api from '../../api/axios';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [adding, setAdding] = useState(false);

  const addToCart = async () => {
    if (!product.id) return;
    setAdding(true);
    try {
      await api.post('/orders/cart/add/', { product_id: product.id, quantity: 1 });
      alert('✅ Товар добавлен в корзину');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) alert('Авторизуйтесь');
      else alert('Ошибка');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || '/placeholder.png'} alt={product.name} />
        {product.old_price && (
          <span className="discount-badge">
            -{Math.round((1 - product.price / product.old_price) * 100)}%
          </span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span>{product.volume} л</span>
          <span>{product.color}</span>
          <span>{product.sweetness}</span>
        </div>
        <div className="product-price">
          {product.old_price && <span className="old-price">{product.old_price} ₽</span>}
          <span className="current-price">{product.price} ₽</span>
        </div>
        <button className="add-to-cart-btn" onClick={addToCart} disabled={adding}>
          {adding ? '...' : 'В корзину'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;