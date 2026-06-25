import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h3>Информация о пользователе</h3>
      <p>Имя: Иван Иванов</p>
      <p>Email: ivan@example.com</p>
      <p>Бонусы: 150 баллов</p>
      {/* Здесь будет зашифрованная информация о реквизитах и т.д. */}
    </div>
  );
};

export default UserProfile;