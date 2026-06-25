import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './SellerSalesPage.css';

const SellerSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/seller/products/sales/')
      .then(res => setSales(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="seller-sales-page">
      <h1>Продажи моих товаров</h1>
      <table className="sales-table">
        <thead><tr><th>Товар</th><th>Кол-во продаж (статистика)</th></tr></thead>
        <tbody>
          {sales.map(s => (
            <tr key={s.product_id}><td>{s.product_name}</td><td>{s.sales_count} шт.</td></tr>
          ))}
        </tbody>
      </table>
      <p className="info-note">* Данные симулированы (случайные числа).</p>
    </div>
  );
};

export default SellerSalesPage;