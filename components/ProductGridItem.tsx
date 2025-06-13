
import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon, InformationCircleIcon } from '../constants';
import { Button } from './Button';

interface ProductGridItemProps {
  product: Product;
}

export const ProductGridItem: React.FC<ProductGridItemProps> = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [showDescription, setShowDescription] = useState(false);

  const itemInCart = cartItems.find(item => item.id === product.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  const handleAdd = () => {
    if (quantityInCart === 0) {
      addToCart(product, 1);
    } else {
      updateQuantity(product.id, quantityInCart + 1);
    }
  };

  const handleRemove = () => {
    if (quantityInCart > 0) {
      updateQuantity(product.id, quantityInCart - 1);
    }
  };
  
  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if icon is clicked
    setShowDescription(!showDescription);
  };


  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col justify-between transform transition-all duration-300 hover:shadow-2xl">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        {product.description && (
          <button 
            onClick={toggleDescription} 
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
            aria-label="Show product description"
          >
            <InformationCircleIcon className="h-6 w-6" />
          </button>
        )}
      </div>
      
      {showDescription && product.description && (
        <div className="p-4 bg-green-50 border-t border-green-200">
          <p className="text-sm text-green-700">{product.description}</p>
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h4 className="text-xl font-semibold text-gray-800 mb-1 truncate" title={product.name}>{product.name}</h4>
        <p className="text-2xl font-bold text-green-600 mb-3">
          ${product.price.toFixed(2)} <span className="text-sm text-gray-500 font-normal">/ {product.unit}</span>
        </p>

        <div className="mt-auto">
          {quantityInCart === 0 ? (
            <Button onClick={handleAdd} fullWidth variant="primary" className="text-lg py-3">
              <PlusIcon className="h-6 w-6 mr-2" /> Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between space-x-2">
              <Button onClick={handleRemove} variant="secondary" className="p-3 aspect-square">
                <MinusIcon className="h-6 w-6" />
              </Button>
              <span className="text-2xl font-bold text-gray-700 w-12 text-center">{quantityInCart}</span>
              <Button onClick={handleAdd} variant="secondary" className="p-3 aspect-square">
                <PlusIcon className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
