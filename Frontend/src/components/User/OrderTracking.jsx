import React, { useState, useEffect } from 'react';
import './OrderTracking.css';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  
  // Мок данные для примера
  const mockOrders = [
    {
      id: 1,
      orderNumber: 'KV-2024-001',
      status: 'in_transit',
      statusText: 'В пути',
      products: ['Квас "Традиционный" (3л)', 'Квас "Ягодный" (2л)'],
      deliveryAddress: 'ул. Ленина, 15, кв. 42',
      estimatedDelivery: '2024-12-15 14:00-18:00',
      courierContact: '+7 (999) 123-45-67',
      steps: [
        { status: 'ordered', label: 'Заказ оформлен', completed: true, date: '10.12.2024 10:30' },
        { status: 'processing', label: 'Сборка заказа', completed: true, date: '10.12.2024 11:15' },
        { status: 'ready', label: 'Готов к отправке', completed: true, date: '10.12.2024 12:00' },
        { status: 'in_transit', label: 'В пути', completed: true, date: '11.12.2024 09:00' },
        { status: 'delivered', label: 'Доставлен', completed: false, date: null }
      ]
    }
  ];

  useEffect(() => {
    setOrders(mockOrders);
    // Здесь будет запрос к API для получения заказов пользователя
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      ordered: '#ff9800',
      processing: '#2196f3',
      ready: '#4caf50',
      in_transit: '#9c27b0',
      delivered: '#009688'
    };
    return colors[status] || '#757575';
  };

  return (
    <div className="order-tracking">
      <h3>Отслеживание доставок</h3>
      
      {orders.length === 0 ? (
        <p className="no-orders">У вас нет активных заказов</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h4>Заказ #{order.orderNumber}</h4>
              <span 
                className="order-status"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.statusText}
              </span>
            </div>
            
            <div className="order-details">
              <p><strong>Товары:</strong> {order.products.join(', ')}</p>
              <p><strong>Адрес доставки:</strong> {order.deliveryAddress}</p>
              <p><strong>Примерное время доставки:</strong> {order.estimatedDelivery}</p>
              <p><strong>Контакт курьера:</strong> {order.courierContact}</p>
            </div>
            
            <div className="tracking-timeline">
              <h5>Статус доставки:</h5>
              <div className="timeline">
                {order.steps.map((step, index) => (
                  <div key={step.status} className="timeline-step">
                    <div className={`step-circle ${step.completed ? 'completed' : ''}`}>
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <div className="step-info">
                      <p className="step-label">{step.label}</p>
                      {step.date && <p className="step-date">{step.date}</p>}
                    </div>
                    {index < order.steps.length - 1 && (
                      <div className={`step-line ${step.completed ? 'completed' : ''}`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <button className="contact-courier">Связаться с курьером</button>
          </div>
        ))
      )}
      
      <div className="delivery-options">
        <h4>Способы доставки:</h4>
        <div className="options-grid">
          <div className="option">
            <div className="option-icon">🚚</div>
            <h5>Доставка курьером</h5>
            <p>1-2 дня, 300 ₽</p>
          </div>
          <div className="option">
            <div className="option-icon">🏪</div>
            <h5>Самовывоз из магазина</h5>
            <p>Сегодня, бесплатно</p>
          </div>
          <div className="option">
            <div className="option-icon">📦</div>
            <h5>Почта России</h5>
            <p>3-7 дней, от 200 ₽</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;