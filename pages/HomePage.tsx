
import React, { useState, useEffect, useCallback } from 'react';
import { Farm } from '../types';
import { getFarmsNearLocation, searchFarmsAndProducts, simulateGeolocation } from '../services/mockDataService';
import { FarmListItem } from '../components/FarmListItem';
import { Button } from '../components/Button';
import { MapPinIcon, SearchIcon } from '../constants';

const MapPlaceholder: React.FC = () => (
  <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center text-gray-500 mb-8 shadow-inner">
    <MapPinIcon className="h-16 w-16 mr-2" />
    <p className="text-xl">Map View (Placeholder)</p>
  </div>
);

export const HomePage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list'); // 'map' for future use

  const fetchFarms = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedFarms = searchTerm 
        ? await searchFarmsAndProducts(searchTerm)
        : await getFarmsNearLocation(); // Pass actual location data if available
      setFarms(fetchedFarms);
    } catch (error) {
      console.error("Failed to fetch farms:", error);
      // Handle error state in UI, e.g., show a message
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchFarms();
  }, [fetchFarms]);

  const handleUseLocation = async () => {
    setIsLoading(true);
    try {
      const coords = await simulateGeolocation();
      setUserLocation(`Near Lat: ${coords.latitude.toFixed(2)}, Lon: ${coords.longitude.toFixed(2)}`);
      // Optionally, refetch farms with new location:
      // const fetchedFarms = await getFarmsNearLocation(coords);
      // setFarms(fetchedFarms);
    } catch (error) {
      console.error("Failed to get location:", error);
      setUserLocation("Could not detect location.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">Find Fresh Food Near You</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Discover local BC farms and enjoy the freshest produce, meats, and artisan goods.
        </p>
      </div>

      <div className="mb-8 p-6 bg-white shadow-lg rounded-xl">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search farms or products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
          <Button onClick={handleUseLocation} size="lg" className="flex-shrink-0 text-lg py-4">
            <MapPinIcon className="h-6 w-6 mr-2" /> Use My Location
          </Button>
        </div>
        {userLocation && <p className="text-sm text-green-700 text-center sm:text-left">{userLocation}</p>}
      </div>
      
      {/* Placeholder for Map/List toggle if needed in future
      <div className="mb-6 flex justify-center">
        <Button onClick={() => setViewMode('list')} variant={viewMode === 'list' ? 'primary' : 'secondary'} className="mr-2">List View</Button>
        <Button onClick={() => setViewMode('map')} variant={viewMode === 'map' ? 'primary' : 'secondary'}>Map View</Button>
      </div>
      */}

      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading farms...</p>
        </div>
      ) : (
        <>
          {viewMode === 'map' && <MapPlaceholder />}
          {farms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {farms.map(farm => (
                <FarmListItem key={farm.id} farm={farm} />
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-500 py-10">
              No farms found matching your criteria. Try a different search or broaden your location.
            </p>
          )}
        </>
      )}
    </div>
  );
};
