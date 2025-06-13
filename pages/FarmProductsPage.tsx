import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Farm } from '../types';
import { getProductsByFarmId, getFarmById } from '../services/mockDataService';
import { ProductGridItem } from '../components/ProductGridItem';
import { Button } from '../components/Button';
import { ShoppingCartIcon } from '../constants';
import { useCart } from '../context/CartContext';

export const FarmProductsPage: React.FC = () => {
  const { farmId } = useParams<{ farmId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [farm, setFarm] = useState<Farm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      if (!farmId) return;
      setIsLoading(true);
      try {
        const [fetchedProducts, fetchedFarm] = await Promise.all([
          getProductsByFarmId(farmId),
          getFarmById(farmId)
        ]);
        setProducts(fetchedProducts);
        if (fetchedFarm) setFarm(fetchedFarm);
        else console.error("Farm details not found for products page");
      } catch (error) {
        console.error("Failed to fetch products or farm details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [farmId]);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
        <p className="mt-6 text-2xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (!farm) {
     return <div className="text-center text-2xl text-red-500 py-20">Farm information could not be loaded. <Link to="/" className="text-green-600 hover:underline">Go Home</Link></div>;
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <Link to={`/farm/${farmId}`} className="text-lg text-green-600 hover:underline">&larr; Back to {farm.name}</Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mt-2 mb-3">Products from {farm.name}</h1>
        <p className="text-lg text-gray-600">{farm.tagline}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {products.map(product => (
            <ProductGridItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-500 mb-4">No products currently available from this farm.</p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Explore Other Farms
          </Button>
        </div>
      )}

      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            as={Link} 
            to="/cart" 
            variant="primary" 
            size="xl"
            className="shadow-2xl rounded-full !p-5" 
            leftIcon={<ShoppingCartIcon className="h-8 w-8" />}
          >
            View Cart ({getTotalItems()})
          </Button>
        </div>
      )}
    </div>
  );
};
