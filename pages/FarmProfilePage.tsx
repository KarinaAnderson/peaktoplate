import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Farm } from '../types';
import { getFarmById } from '../services/mockDataService';
import { Button } from '../components/Button';
import { CalendarDaysIcon, ClockIcon, TruckIcon, InformationCircleIcon, ChevronRightIcon } from '../constants';

export const FarmProfilePage: React.FC = () => {
  const { farmId } = useParams<{ farmId: string }>();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    const fetchFarmData = async () => {
      if (!farmId) return;
      setIsLoading(true);
      try {
        const fetchedFarm = await getFarmById(farmId);
        if (fetchedFarm) {
          setFarm(fetchedFarm);
        } else {
          // Handle farm not found
          console.error("Farm not found");
        }
      } catch (error) {
        console.error("Failed to fetch farm details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFarmData();
  }, [farmId]);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
        <p className="mt-6 text-2xl text-gray-600">Loading farm details...</p>
      </div>
    );
  }

  if (!farm) {
    return <div className="text-center text-2xl text-red-500 py-20">Farm not found.</div>;
  }

  const availableProductsCount = farm.products.filter(p => p.isAvailable).length;

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="relative">
        <img src={farm.heroImage} alt={farm.name} className="w-full h-64 sm:h-80 md:h-96 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2">{farm.name}</h1>
          <p className="text-xl sm:text-2xl text-green-300 font-medium">{farm.tagline}</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to {farm.name}</h2>
            
            {farm.story && (
              <div className="mb-8">
                 <Button 
                    onClick={() => setShowStory(!showStory)} 
                    variant="ghost" 
                    className="text-lg mb-2 px-0 hover:bg-green-50"
                    leftIcon={<InformationCircleIcon className="h-6 w-6 text-green-600"/>}
                  >
                    {showStory ? 'Hide Our Story' : 'Read Our Story'}
                  </Button>
                {showStory && (
                  <div className="p-4 bg-green-50 rounded-lg prose prose-lg max-w-none text-gray-700">
                    <p>{farm.story}</p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-6">
               {availableProductsCount > 0 ? (
                <Button
                  as={Link}
                  to={`/farm/${farm.id}/products`}
                  variant="primary"
                  size="xl"
                  fullWidth
                  className="text-2xl py-5 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  rightIcon={<ChevronRightIcon className="h-7 w-7" />}
                >
                  Shop Available Now ({availableProductsCount} items)
                </Button>
              ) : (
                <div className="p-6 text-center bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                    <p className="text-xl font-semibold text-yellow-700">No products currently available from this farm.</p>
                    <p className="text-gray-600 mt-2">Please check back later or explore other farms.</p>
                </div>
              )}

              {farm.offersSubscriptions && farm.subscriptionOptions && farm.subscriptionOptions.length > 0 && (
                <Button
                  variant="secondary"
                  size="xl"
                  fullWidth
                  disabled // For now, as subscription flow is not fully implemented
                  className="text-2xl py-5 shadow-lg" // Removed opacity/cursor-not-allowed here, Button handles disabled state
                >
                  View Subscriptions (Coming Soon)
                </Button>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Farm Info</h3>
            <div className="space-y-5">
              <div className="flex items-start">
                <CalendarDaysIcon className="h-7 w-7 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">Pickup Hours</h4>
                  <p className="text-gray-600">{farm.pickupTimes}</p>
                </div>
              </div>
              {farm.deliveryInfo && (
                <div className="flex items-start">
                  <TruckIcon className="h-7 w-7 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Delivery</h4>
                    <p className="text-gray-600">{farm.deliveryInfo}</p>
                  </div>
                </div>
              )}
               <div className="flex items-start">
                <ClockIcon className="h-7 w-7 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">Location</h4>
                  <p className="text-gray-600">{farm.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
