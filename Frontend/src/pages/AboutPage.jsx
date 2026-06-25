import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">О магазине Vash-Kvas</h1>
        
        <div className="about-content">
          <div className="about-text">
            <p>Мы — команда энтузиастов, влюблённых в настоящий русский квас. Наш магазин создан для тех, кто ценит традиции и качество.</p>
            <p>Мы сотрудничаем с небольшими частными пивоварнями, которые варят квас по старинным рецептам — без консервантов, красителей и искусственных добавок. Только натуральные ингредиенты: ржаной солод, вода, дрожжи и сахар.</p>
            <p>В нашем каталоге вы найдёте классический хлебный квас, ягодные и фруктовые вариации, а также эксклюзивные сорта от крафтовых производителей.</p>
            <p>Мы заботимся о своих покупателях: быстрая доставка, удобная оплата и всегда свежий продукт. Присоединяйтесь к нашей квасной культуре!</p>
          </div>
          <div className="about-image">
            <div className="placeholder-image">🍺</div>
          </div>
        </div>

        <div className="contacts">
          <h2>Контакты</h2>
          <p>📞 Телефон: +7 (999) 123-45-67</p>
          <p>📧 Email: info@vash-kvas.ru</p>
          <p>📍 Адрес: г. Москва, ул. Квасная, д. 1</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;