import { useState, useEffect, useCallback } from 'react';
import { googleMapsService } from '../services/googleMapsService';

export const useGoogleRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

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

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Failed to get user location:', error);
        }
      );
    }
  }, []);

  // Fetch restaurants function
  const fetchRestaurants = useCallback(async (location, cuisineType = '') => {
    if (!initialized) {
      return;
    }

    setLoading(true);

    try {
      const results = await googleMapsService.searchRestaurants(location, 5000, cuisineType, userLocation);
      setRestaurants(results);
      return results;
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
      setRestaurants([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [initialized, userLocation]);

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
    getRestaurantDetails,
    userLocation
  };
};

export default useGoogleRestaurants;