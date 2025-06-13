
import React from 'react';
import { CartItem } from '../types';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon } from '../constants';
import { Button } from './Button';

interface CartViewItemProps {
  item: CartItem;
}

export const CartViewItem: React.FC<CartViewItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between p-4 sm:p-6 bg-white shadow rounded-lg mb-4">
      <div className="flex items-center flex-grow">
        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md mr-4 sm:mr-6" />
        <div className="flex-grow">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600 text-sm sm:text-base">${item.price.toFixed(2)} / {item.unit}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 ml-4">
        <Button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
            variant="secondary" 
            size="sm" 
            className="p-2 sm:p-3 aspect-square text-sm"
            aria-label="Decrease quantity"
        >
          <MinusIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        <span className="text-xl sm:text-2xl font-bold text-gray-700 w-8 text-center">{item.quantity}</span>
        <Button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
            variant="secondary" 
            size="sm"
            className="p-2 sm:p-3 aspect-square text-sm"
            aria-label="Increase quantity"
        >
          <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
      <div className="ml-4 sm:ml-6 text-right min-w-[80px] sm:min-w-[100px]">
         <p className="text-lg sm:text-xl font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
         <button 
            onClick={() => removeFromCart(item.id)} 
            className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium mt-1"
            aria-label="Remove item from cart"
          >
            Remove
          </button>
      </div>
    </div>
  );
};
