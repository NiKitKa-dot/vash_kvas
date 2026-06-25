import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OwnerStatsPage from './pages/OwnerStatsPage';
import SellerProductsPage from './pages/SellerProductsPage';
import SellerSalesPage from './pages/SellerSalesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const PrivateRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Загрузка...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.profile?.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/orders" element={<OrdersPage />} />
        <Route path="owner-stats" element={<PrivateRoute requiredRole="owner"><OwnerStatsPage /></PrivateRoute>} />
        <Route path="seller/products" element={<PrivateRoute requiredRole="seller"><SellerProductsPage /></PrivateRoute>} />
        <Route path="seller/sales" element={<PrivateRoute requiredRole="seller"><SellerSalesPage /></PrivateRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;