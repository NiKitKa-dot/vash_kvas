import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/')
      .then(response => {
        let data = response.data;
        // Если ответ содержит пагинацию (results)
        if (data && Array.isArray(data.results)) {
          data = data.results;
        } else if (!Array.isArray(data)) {
          data = [];
        }
        const filtered = data.filter(order => order.status !== 'cart');
        setOrders(filtered);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const getStatusText = (status) => {
    const map = {
      ordered: 'Оформлен',
      processing: 'В обработке',
      ready: 'Готов к отправке',
      in_transit: 'В пути',
      delivered: 'Доставлен',
      cancelled: 'Отменён',
    };
    return map[status] || status;
  };

  if (loading) return <div>Загрузка...</div>;
  if (orders.length === 0) return <div>У вас пока нет заказов</div>;

  return (
    <div className="orders-page">
      <h1>Мои заказы</h1>
      <table className="orders-table">
        <thead>
          <tr><th>№ заказа</th><th>Дата</th><th>Статус</th><th>Сумма</th><th>Доставка</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td className={`status-${order.status}`}>{getStatusText(order.status)}</td>
              <td>{order.total_price} ₽</td>
              <td>{order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;