import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './SellerProductsPage.css';

const SellerProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    price: '',
    volume: '',
    color: 'light',
    sweetness: 'semi_sweet',
    in_stock: true,
    image: null,
    old_price: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    api.get('/seller/products/')
      .then(res => {
        // ✅ Извлекаем массив из пагинированного ответа
        if (res.data && Array.isArray(res.data.results)) {
          setProducts(res.data.results);
        } else if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
        setError('');
      })
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить товары. Проверьте авторизацию.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  for (const key in form) {
    // Пропускаем image, если оно null (не выбрано новое)
    if (key === 'image' && (form[key] === null || form[key] === '')) continue;
    if (form[key] !== undefined && form[key] !== null && form[key] !== '') {
      if (key === 'image' && form[key] instanceof File) {
        formData.append(key, form[key]);
      } else if (key !== 'image') {
        formData.append(key, form[key]);
      }
    }
  
    }
    try {
      if (editingId) {
        await api.put(`/seller/products/${editingId}/`, formData);
      } else {
        await api.post('/seller/products/', formData);
      }
      setForm({
        name: '', price: '', volume: '', color: 'light', sweetness: 'semi_sweet',
        in_stock: true, image: null, old_price: ''
      });
      setEditingId(null);
      fetchProducts();
      alert('Товар сохранён');
    } catch (err) {
      console.error(err);
      alert('Ошибка сохранения. ' + (err.response?.data?.detail || ''));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить товар?')) {
      try {
        await api.delete(`/seller/products/${id}/`);
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert('Ошибка удаления');
      }
    }
  };

  const editProduct = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      volume: product.volume,
      color: product.color,
      sweetness: product.sweetness,
      in_stock: product.in_stock,
      image: null,
      old_price: product.old_price || ''
    });
    setEditingId(product.id);
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="seller-products-page">
      <h1>Мои товары</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
        <div className="form-row">
          <input type="text" placeholder="Название" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input type="number" step="0.01" placeholder="Цена ₽" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input type="number" step="0.1" placeholder="Объём л" value={form.volume} onChange={e => setForm({...form, volume: e.target.value})} required />
        </div>
        <div className="form-row">
          <select value={form.color} onChange={e => setForm({...form, color: e.target.value})}>
            <option value="light">Светлый</option><option value="dark">Тёмный</option>
            <option value="white">Белый</option><option value="berry">Ягодный</option>
          </select>
          <select value={form.sweetness} onChange={e => setForm({...form, sweetness: e.target.value})}>
            <option value="dry">Сухой</option><option value="semi_dry">Полусухой</option>
            <option value="semi_sweet">Полусладкий</option><option value="sweet">Сладкий</option>
          </select>
          <label><input type="checkbox" checked={form.in_stock} onChange={e => setForm({...form, in_stock: e.target.checked})} /> В наличии</label>
          <input type="file" accept="image/*" onChange={e => setForm({...form, image: e.target.files[0]})} />
          <input type="number" step="0.01" placeholder="Старая цена" value={form.old_price} onChange={e => setForm({...form, old_price: e.target.value})} />
        </div>
        <div className="form-buttons">
          <button type="submit">{editingId ? 'Обновить' : 'Добавить'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', price: '', volume: '', color: 'light', sweetness: 'semi_sweet', in_stock: true, image: null, old_price: '' }); }}>Отмена</button>}
        </div>
      </form>
      <div className="products-list">
        {products.length === 0 && <p>У вас ещё нет товаров.</p>}
        {products.map(p => (
          <div key={p.id} className="seller-product-card">
            <div><strong>{p.name}</strong> — {p.price} ₽ ({p.volume} л) {p.in_stock ? '✅' : '❌'}</div>
            <div><button onClick={() => editProduct(p)}>✏️</button> <button onClick={() => handleDelete(p.id)}>🗑️</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerProductsPage;