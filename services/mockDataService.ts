
import { Farm, Product, LocationCoordinates } from '../types';
import { MOCK_FARMS } from '../constants';

// Simulate API delay
const apiDelay = <T,>(data: T, delay: number = 300): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const getFarmsNearLocation = async (location?: LocationCoordinates): Promise<Farm[]> => {
  // Simulate location-based filtering if location is provided
  // For now, returns all mock farms
  console.log('Fetching farms near:', location);
  return apiDelay(MOCK_FARMS);
};

export const searchFarmsAndProducts = async (searchTerm: string): Promise<Farm[]> => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  if (!lowerSearchTerm) return apiDelay(MOCK_FARMS);

  const filteredFarms = MOCK_FARMS.filter(farm =>
    farm.name.toLowerCase().includes(lowerSearchTerm) ||
    farm.products.some(product => product.name.toLowerCase().includes(lowerSearchTerm) && product.isAvailable)
  ).map(farm => {
    // If searching for products, ideally we'd only show farms that have that product
    // This is a simplified version
    return farm;
  });
  return apiDelay(filteredFarms);
};

export const getFarmById = async (farmId: string): Promise<Farm | undefined> => {
  const farm = MOCK_FARMS.find(f => f.id === farmId);
  return apiDelay(farm);
};

export const getProductsByFarmId = async (farmId: string): Promise<Product[]> => {
  const farm = MOCK_FARMS.find(f => f.id === farmId);
  if (farm) {
    return apiDelay(farm.products.filter(p => p.isAvailable));
  }
  return apiDelay([]);
};

export const simulateGeolocation = async (): Promise<LocationCoordinates> => {
  // Simulate getting current location
  return apiDelay({ latitude: 49.2827, longitude: -123.1207 }); // Vancouver coordinates
};
