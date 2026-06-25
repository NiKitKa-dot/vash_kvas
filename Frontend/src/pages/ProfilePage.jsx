import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.profile?.phone || '',
        address: user.profile?.address || ''
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      // Обновляем поля модели User (first_name, last_name, email)
      await api.patch('/auth/profile/', {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email
      });
      // Обновляем поля профиля (phone, address)
      await api.patch('/auth/profile/', {
        phone: form.phone,
        address: form.address
      });
      const updatedUser = await api.get('/auth/profile/');
      setUser(updatedUser.data);
      setMessage('✅ Профиль успешно обновлён');
    } catch (err) {
      console.error(err);
      setMessage('❌ Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="profile-loading">Загрузка...</div>;

  return (
    <div className="profile-page">
      <h2>Личный кабинет</h2>
      {message && <div className={`profile-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Имя</label>
          <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Иван" />
        </div>
        <div className="form-group">
          <label>Фамилия</label>
          <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Иванов" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ivan@example.com" />
        </div>
        <div className="form-group">
          <label>Телефон</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+7 (999) 123-45-67" />
        </div>
        <div className="form-group">
          <label>Адрес доставки</label>
          <textarea name="address" value={form.address} onChange={handleChange} rows="2" placeholder="г. Москва, ул. Пушкина, д. 10" />
        </div>
        <button type="submit" disabled={saving}>Сохранить изменения</button>
      </form>
    </div>
  );
};

export default ProfilePage;