import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './RegisterPage.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    password2: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
  e.preventDefault();
  if (form.password !== form.password2) {
    setError('Пароли не совпадают');
    return;
  }
  if (form.password.length < 8) {
    setError('Пароль должен содержать минимум 8 символов');
    return;
  }
  // Подготовим данные для отправки (без лишних полей)
  const dataToSend = {
    username: form.username,
    password: form.password,
    password2: form.password2,
    role: form.role || 'customer'
  };
  console.log('Отправляемые данные:', dataToSend);
  try {
    const result = await register(dataToSend);
    console.log('Результат регистрации:', result);
    navigate('/');
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    const errorMsg = err.response?.data?.detail || err.response?.data?.username || 'Ошибка регистрации. Возможно, имя пользователя уже занято.';
    setError(errorMsg);
  }
};

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Имя пользователя</label>
            <input
              type="text"
              placeholder="Введите логин"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Минимум 8 символов"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Подтверждение пароля</label>
            <input
              type="password"
              placeholder="Повторите пароль"
              value={form.password2}
              onChange={(e) => setForm({ ...form, password2: e.target.value })}
              required
            />
          </div>

        
          <div className="form-group">
            <label>Роль</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
               <option value="customer">Покупатель</option>
                <option value="seller">Продавец</option>
              </select>
            <small>Обычные пользователи регистрируются как Покупатель.</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="rules">
            <small>Правила регистрации:</small>
            <ul>
              <li>Логин должен быть уникальным</li>
              <li>Пароль: минимум 8 символов</li>
              <li>Не использовать простые пароли (qwerty, 12345678)</li>
            </ul>
          </div>

          <button type="submit" className="register-btn">Зарегистрироваться</button>
        </form>
        <p className="login-link">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;