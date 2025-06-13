
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, ShoppingCartIcon } from '../constants';
import { useCart } from '../context/CartContext';

interface LayoutProps {
  children: ReactNode;
}

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-green-700">
          {APP_NAME} <span role="img" aria-label="mountain emoji">🏔️</span>
        </Link>
        <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
          <ShoppingCartIcon className="h-8 w-8 text-gray-700" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center py-8 mt-auto">
      <p className="text-gray-600">&copy; {new Date().getFullYear()} {APP_NAME}. Fresh from BC farms.</p>
    </footer>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
