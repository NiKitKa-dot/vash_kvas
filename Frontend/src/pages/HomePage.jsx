import React, { useState, useEffect } from 'react';
import ProductList from '../components/Products/ProductList';
import api from '../api/axios';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/')
      .then(response => {
        // Пагинированный ответ: товары лежат в response.data.results
        const items = response.data.results || [];
        setProducts(items.slice(0, 6)); // первые 6 товаров
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Добро пожаловать в Vash-Kvas!</h1>
        <p>Настоящий русский квас с доставкой на дом</p>
      </div>
      <div className="products-section">
        <h2>Популярные товары</h2>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default HomePage;