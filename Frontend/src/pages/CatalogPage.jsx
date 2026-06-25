import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductFilters from '../components/Products/ProductFilters';
import ProductCard from '../components/Products/ProductCard';
import './CatalogPage.css';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
  volume: [],
  color: [],
  sweetness: '',
  priceRange: [0, 1000],
  sortBy: 'recommended'
});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = (loadMore = false, pageUrl = null) => {
    setLoading(true);
    let url = pageUrl || '/products/';
    if (!loadMore) setProducts([]);
    const params = { ...filters };
    if (search) params.search = search;
    api.get(url, { params })
      .then(response => {
        const newProducts = response.data.results;
        setProducts(prev => loadMore ? [...prev, ...newProducts] : newProducts);
        setNextPage(response.data.next);
        setHasMore(!!response.data.next);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts(false);
  }, [filters, search]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const loadMore = () => {
    if (nextPage) loadProducts(true, nextPage);
  };

  if (loading && products.length === 0) return <div>Загрузка...</div>;

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h2>Каталог кваса</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="catalog-content">
        <aside className="filters-sidebar">
          <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
        </aside>
        <main className="products-main">
          <div className="product-list">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {hasMore && !loading && (
            <button onClick={loadMore} className="load-more-btn">Загрузить ещё</button>
          )}
          {loading && <div>Загрузка...</div>}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;