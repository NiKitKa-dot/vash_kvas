import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './OwnerStatsPage.css';

const OwnerStatsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/owner/stats/')
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка статистики...</div>;
  if (!stats) return <div>Ошибка загрузки</div>;

  return (
    <div className="owner-stats-page">
      <h1>Статистика сайта</h1>
      <table className="stats-table">
        <tbody>
          <tr><th>Всего пользователей</th><td>{stats.total_users}</td></tr>
          <tr><th>Продавцов</th><td>{stats.sellers_count}</td></tr>
          <tr><th>Заказов (оформлено)</th><td>{stats.total_orders}</td></tr>
          <tr><th>Общая сумма продаж</th><td>{stats.total_sales} ₽</td></tr>
        </tbody>
      </table>
      <h2>Продажи за последние 7 дней (тыс. ₽)</h2>
      <div className="week-chart">
        {stats.weekly_sales.map((val, idx) => (
          <div key={idx} className="bar" style={{ height: `${val / 500}px` }} title={`${val} ₽`} />
        ))}
      </div>
    </div>
  );
};

export default OwnerStatsPage;