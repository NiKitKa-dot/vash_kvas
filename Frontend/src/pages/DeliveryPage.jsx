import React from 'react';
import './DeliveryPage.css'; // создадим чуть позже

const DeliveryPage = () => {
  return (
    <div className="delivery-page">
      <div className="container">
        <h1 className="page-title">Доставка кваса</h1>
        
        <div className="delivery-options">
          <div className="delivery-card">
            <div className="delivery-icon">🚚</div>
            <h3>Курьерская доставка</h3>
            <p>Доставка по городу — от 300 ₽ (бесплатно при заказе от 1500 ₽)</p>
            <ul>
              <li>Срок: 1–2 дня</li>
              <li>Оплата картой или наличными</li>
            </ul>
          </div>

          <div className="delivery-card">
            <div className="delivery-icon">🏪</div>
            <h3>Самовывоз из магазина</h3>
            <p>Заберите заказ в ближайшем магазине сети</p>
            <ul>
              <li>Срок: сегодня (при заказе до 14:00)</li>
              <li>Оплата онлайн или при получении</li>
            </ul>
          </div>

          <div className="delivery-card">
            <div className="delivery-icon">📦</div>
            <h3>Почта России</h3>
            <p>Доставка в любой населённый пункт</p>
            <ul>
              <li>Срок: 3–10 дней</li>
              <li>Стоимость рассчитывается при оформлении</li>
            </ul>
          </div>
        </div>

        <div className="delivery-info">
          <h2>Условия доставки</h2>
          <p>Мы доставляем квас только в герметичной таре, чтобы сохранить свежесть. При получении обязательно проверяйте целостность упаковки.</p>
          <p>Зона доставки постоянно расширяется. Если вашего адреса нет в списке — свяжитесь с нами!</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;