import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import ProductCard from '../components/Products/ProductCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const { data: favorites, isLoading, isError } = useFavorites();

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (isError) return <div className="error">Ошибка загрузки избранного</div>;

  return (
    <div className="favorites-page">
      <h2>Избранное</h2>
      {favorites.length === 0 ? (
        <p>У вас пока нет избранных товаров</p>
      ) : (
        <div className="favorites-list">
          {favorites.map(fav => (
            <ProductCard
              key={fav.id}
              product={fav.product_detail}
              isFavoriteProp={true}
              favoriteIdProp={fav.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;