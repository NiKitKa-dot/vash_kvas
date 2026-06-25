import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useAuth();
  const role = user?.profile?.role;

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">🍺 Vash-Kvas</Link>
        <nav>
          <Link to="/catalog">Каталог</Link>
          <Link to="/cart">Корзина</Link>
          <Link to="/profile/orders">Мои заказы</Link>
          {role === 'seller' && (
            <>
              <Link to="/seller/products">Мои товары</Link>
              <Link to="/seller/sales">Продажи</Link>
            </>
          )}
          {role === 'owner' && (
            <Link to="/owner-stats">Статистика</Link>
          )}
          <Link to="/profile">Профиль</Link>
        </nav>
        {user ? (
          <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Выйти</button>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </div>
    </header>
  );
};

export default Header;