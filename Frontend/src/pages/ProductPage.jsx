import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import RatingSystems from '../components/ProductDetail/RatingSystems';
import api from '../api/axios';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}/`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!product) return <div>Загрузка...</div>;

  return (
    <div className="product-page">
      <ProductInfo product={product} />
      <RatingSystems productId={product.id} />
    </div>
  );
};

export default ProductPage;