
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FarmProfilePage } from './pages/FarmProfilePage';
import { FarmProductsPage } from './pages/FarmProductsPage';
import { CartPage } from './pages/CartPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/farm/:farmId" element={<FarmProfilePage />} />
            <Route path="/farm/:farmId/products" element={<FarmProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            {/* Add other routes as needed */}
          </Routes>
        </Layout>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
