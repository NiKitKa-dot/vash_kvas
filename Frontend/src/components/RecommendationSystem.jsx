import React, { useState, useEffect } from 'react';
import './RecommendationSystem.css';

const RecommendationSystem = ({ userLocation }) => {
  const [recommendations, setRecommendations] = useState({
    nearby: [],
    warehouse: []
  });

  const [preferences, setPreferences] = useState({
    radius: 5, // км
    priceRange: [0, 500],
    types: ['traditional', 'berry', 'fruit']
  });

  // Мок данные
  const mockNearbyProducts = [
    { id: 1, name: 'Квас "Домашний"', shop: 'Магазин у дома', distance: 0.5, price: 150 },
    { id: 2, name: 'Квас "Бочонок"', shop: 'Супермаркет Spar', distance: 1.2, price: 180 },
    { id: 3, name: 'Квас "Хлебный"', shop: 'Продукты 24/7', distance: 0.8, price: 160 }
  ];

  const mockWarehouseProducts = [
    { id: 4, name: 'Квас "Премиум"', delivery: '1-2 дня', price: 250 },
    { id: 5, name: 'Квас "Эксклюзивный"', delivery: '3-5 дней', price: 350 },
    { id: 6, name: 'Квас "Имбирный"', delivery: '2-3 дня', price: 220 }
  ];

  useEffect(() => {
    // Здесь будет логика получения рекомендаций
    setRecommendations({
      nearby: mockNearbyProducts,
      warehouse: mockWarehouseProducts
    });
  }, [userLocation, preferences]);

  const handlePreferenceChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="recommendation-system">
      <div className="recommendation-header">
        <h3>Рекомендации для вас</h3>
        <div className="preferences">
          <label>
            Радиус поиска:
            <input
              type="range"
              min="1"
              max="20"
              value={preferences.radius}
              onChange={(e) => handlePreferenceChange('radius', parseInt(e.target.value))}
            />
            <span>{preferences.radius} км</span>
          </label>
        </div>
      </div>

      <div className="recommendation-section">
        <h4>🎯 Ближайшие к вам</h4>
        <div className="products-grid nearby">
          {recommendations.nearby.map(product => (
            <div key={product.id} className="recommendation-card nearby">
              <div className="card-content">
                <h5>{product.name}</h5>
                <p className="shop">{product.shop}</p>
                <div className="product-meta">
                  <span className="distance">📍 {product.distance} км</span>
                  <span className="price">{product.price} ₽</span>
                </div>
                <button className="reserve-btn">Забронировать</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendation-section">
        <h4>📦 Доставка со склада</h4>
        <div className="products-grid warehouse">
          {recommendations.warehouse.map(product => (
            <div key={product.id} className="recommendation-card warehouse">
              <div className="card-content">
                <h5>{product.name}</h5>
                <p className="delivery">🚚 {product.delivery}</p>
                <div className="product-meta">
                  <span className="price">{product.price} ₽</span>
                </div>
                <button className="add-to-cart-btn">В корзину</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendation-filters">
        <h5>Настройки рекомендаций:</h5>
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              checked={preferences.types.includes('traditional')}
              onChange={(e) => {
                const newTypes = e.target.checked
                  ? [...preferences.types, 'traditional']
                  : preferences.types.filter(t => t !== 'traditional');
                handlePreferenceChange('types', newTypes);
              }}
            />
            Традиционный
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.types.includes('berry')}
              onChange={(e) => {
                const newTypes = e.target.checked
                  ? [...preferences.types, 'berry']
                  : preferences.types.filter(t => t !== 'berry');
                handlePreferenceChange('types', newTypes);
              }}
            />
            Ягодный
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.types.includes('fruit')}
              onChange={(e) => {
                const newTypes = e.target.checked
                  ? [...preferences.types, 'fruit']
                  : preferences.types.filter(t => t !== 'fruit');
                handlePreferenceChange('types', newTypes);
              }}
            />
            Фруктовый
          </label>
        </div>
      </div>
    </div>
  );
};

export default RecommendationSystem;