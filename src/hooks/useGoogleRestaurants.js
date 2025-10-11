import { useState, useEffect, useCallback } from 'react';
import { googleMapsService } from '../services/googleMapsService';

export const useGoogleRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize Google Maps API
  useEffect(() => {
    const initializeMaps = async () => {
      try {
        const success = await googleMapsService.initialize();
        setInitialized(success);
      } catch (err) {
        console.error('Failed to initialize Google Maps:', err);
      }
    };

    initializeMaps();
  }, []);

  // Fetch restaurants function
  const fetchRestaurants = useCallback(async (location, cuisineType = '') => {
    if (!initialized) {
      return;
    }

    setLoading(true);

    try {
      const results = await googleMapsService.searchRestaurants(location, 5000, cuisineType);
      setRestaurants(results);
      return results;
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
      setRestaurants([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [initialized]);

  // Get restaurant details
  const getRestaurantDetails = useCallback(async (placeId) => {
    if (!initialized) {
      return null;
    }

    try {
      const details = await googleMapsService.getPlaceDetails(placeId);
      return details;
    } catch (err) {
      console.error('Failed to fetch restaurant details:', err);
      return null;
    }
  }, [initialized]);

  return {
    restaurants,
    loading,
    initialized,
    fetchRestaurants,
    getRestaurantDetails
  };
};

export default useGoogleRestaurants;