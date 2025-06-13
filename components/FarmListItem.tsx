import React from 'react';
import { Link } from 'react-router-dom';
import { Farm } from '../types';
import { MapPinIcon, ChevronRightIcon } from '../constants';
import { Button } from './Button';

interface FarmListItemProps {
  farm: Farm;
}

export const FarmListItem: React.FC<FarmListItemProps> = ({ farm }) => {
  const availableProductsCount = farm.products.filter(p => p.isAvailable).length;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img src={farm.heroImage} alt={farm.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{farm.name}</h3>
        <p className="text-gray-600 mb-1 flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2 text-green-600" />
          {farm.location} ({farm.distance})
        </p>
        <p className="text-sm text-gray-500 mb-4">{farm.tagline}</p>
        
        {availableProductsCount > 0 ? (
           <p className="text-green-700 font-semibold mb-4">{availableProductsCount} product(s) available now!</p>
        ) : (
           <p className="text-red-600 font-semibold mb-4">No products currently available.</p>
        )}
       
        <Button
          as={Link}
          to={`/farm/${farm.id}`}
          variant="primary"
          fullWidth
          className="text-lg py-3" // Ensure large tap target
          rightIcon={<ChevronRightIcon className="h-6 w-6"/>}
        >
          Visit Farm
        </Button>
      </div>
    </div>
  );
};
