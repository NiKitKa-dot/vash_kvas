import React from 'react';
import './ProductInfo.css';

const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{maxWidth: '300px'}} />
      <p>{product.description}</p>
      <p>Цена: {product.price} ₽</p>
      <p>Объём: {product.volume} л</p>
      <p>Цвет: {product.color}</p>
      <p>Сладость: {product.sweetness}</p>
      <button>В корзину</button>
    </div>
  );
};

export default ProductInfo;