import { GOOGLE_MAPS_CONFIG } from '../config/googleMaps.js';

class GoogleMapsService {
  constructor() {
    this.google = null;
    this.placesService = null;
    this.map = null;
  }

  async initialize() {
    try {
      // Check if API key is configured
      if (!GOOGLE_MAPS_CONFIG.apiKey) {
        console.error(
          'Google Maps API key is missing!\n\n' +
          'To fix this:\n' +
          '1. Create a .env file in the project root if it doesn\'t exist\n' +
          '2. Add your API key: VITE_GOOGLE_MAPS_API_KEY=your_api_key_here\n' +
          '3. Restart the development server\n\n' +
          'Need an API key? Visit: https://console.cloud.google.com/google/maps-apis/credentials'
        );
        return false;
      }

      console.log('Initializing Google Maps with config:', {
        apiKeyStatus: GOOGLE_MAPS_CONFIG.apiKey ? 'Configured' : 'Missing',
        libraries: GOOGLE_MAPS_CONFIG.libraries,
        version: GOOGLE_MAPS_CONFIG.version,
        region: GOOGLE_MAPS_CONFIG.region,
        language: GOOGLE_MAPS_CONFIG.language
      });
      
      // Load Google Maps API dynamically
      await this.loadGoogleMapsAPI();
      
      // Verify the API loaded correctly
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error('Google Maps API or Places library not loaded correctly');
        return false;
      }

      console.log('Google Maps API initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to load Google Maps API:', error);
      return false;
    }
  }

  loadGoogleMapsAPI() {
    return new Promise((resolve, reject) => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        this.google = window.google;
        resolve();
        return;
      }

      // Create script element with explicit places library
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places,geometry&callback=initMap&v=${GOOGLE_MAPS_CONFIG.version}`;
      script.async = true;
      script.defer = true;
      
      // Add global callback
      window.initMap = () => {
        console.log('Google Maps callback executed');
        if (window.google && window.google.maps) {
          this.google = window.google;
          resolve();
        } else {
          reject(new Error('Google Maps failed to load properly'));
        }
      };

      script.onload = () => {
        this.google = window.google;
        // Add error handling for API key issues
        if (window.google && window.google.maps) {
          // Test if the API key is valid by trying to access the geocoder
          try {
            const geocoder = new window.google.maps.Geocoder();
            // If we can create a geocoder, the API key is likely valid
            resolve();
          } catch (error) {
            reject(new Error('Google Maps API key appears to be invalid or unauthorized'));
          }
        } else {
          reject(new Error('Google Maps API failed to initialize properly'));
        }
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API - check your API key and network connection'));
      };

      // Add timeout for loading
      setTimeout(() => {
        if (!this.google) {
          reject(new Error('Google Maps API loading timeout - please check your API key'));
        }
      }, 10000); // 10 second timeout

      document.head.appendChild(script);
    });
  }

  async searchRestaurants(location, radius = 5000, cuisineType = '', userLocation = null) {
    try {
      console.log('Searching restaurants with params:', { location, radius, cuisineType, hasUserLocation: !!userLocation });
      
      if (!this.google) {
        console.log('Google Maps not initialized, attempting to initialize...');
        const initialized = await this.initialize();
        if (!initialized) {
          console.error('Google Maps not initialized');
          return [];
        }
      }

      // Create a hidden div for the Places service if not exists
      let mapDiv = document.getElementById('google-maps-places');
      if (!mapDiv) {
        mapDiv = document.createElement('div');
        mapDiv.id = 'google-maps-places';
        mapDiv.style.display = 'none';
        document.body.appendChild(mapDiv);
      }

      // Create a map instance for the Places service
      const map = new this.google.maps.Map(mapDiv, {
        center: userLocation || { lat: 0, lng: 0 },
        zoom: 13
      });
      
      this.placesService = new this.google.maps.places.PlacesService(map);

      // Get the search location
      const searchLocation = await this.geocodeLocation(location);
      if (!searchLocation) {
        console.error('Could not determine search location');
        return [];
      }

      // Build the search query
      const query = cuisineType && cuisineType !== 'All' 
        ? `${cuisineType.toLowerCase()} restaurant`
        : 'restaurant';

      const request = {
        location: searchLocation,
        radius: radius,
        type: ['restaurant'],
        keyword: query
      };

      return new Promise((resolve) => {
        this.placesService.nearbySearch(request, (results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK && results) {
            const restaurants = results.map(place => 
              this.transformPlaceToRestaurant(place, userLocation)
            );
            resolve(restaurants);
          } else {
            console.warn('Places API returned status:', status);
            resolve([]);
          }
        });
      });
    } catch (error) {
      console.error('Error searching for restaurants:', error);
      return [];
    }
  }

  async geocodeLocation(location) {
    // If location is already a LatLng object, return it
    if (typeof location !== 'string') {
      return location;
    }

    // Otherwise, geocode the address
    return new Promise((resolve) => {
      const geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === this.google.maps.GeocoderStatus.OK && results[0]) {
          resolve(results[0].geometry.location);
        } else {
          console.error('Geocoding failed:', status);
          resolve(null);
        }
      });
    });
  }

  transformPlaceToRestaurant(place, userLocation = null) {
    // Extract price range from price level (0-4, where 4 is most expensive)
    const priceRange = this.getPriceRange(place.price_level);
    
    // Extract dietary options from types and name
    const dietaryOptions = this.extractDietaryOptions(place.types, place.name);
    
    // Generate a cuisine type from types and name
    const cuisine = this.extractCuisine(place.types, place.name);

    // Calculate distance if user location is provided
    let distance = null;
    if (userLocation && place.geometry && place.geometry.location) {
      distance = this.calculateDistance(
        userLocation.lat, 
        userLocation.lng,
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    }

    return {
      id: place.place_id,
      name: place.name,
      cuisine: cuisine,
      priceRange: priceRange,
      rating: place.rating || 0,
      address: place.vicinity || place.formatted_address || '',
      dietaryOptions: dietaryOptions,
      image: place.photos && place.photos.length > 0 
        ? place.photos[0].getUrl({ maxWidth: 800, maxHeight: 600 })
        : `https://placehold.co/800x600/FF6B6B/FFFFFF?text=${encodeURIComponent(place.name.substring(0, 10))}`,
      description: `Restaurant located at ${place.vicinity || 'unknown location'}`,
      menu: [], // Would need separate API call for menu details
      reviews: [], // Would need separate API call for reviews
      placeId: place.place_id,
      location: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      },
      distance: distance,
      isOpen: place.opening_hours ? place.opening_hours.isOpen() : null,
      phoneNumber: place.formatted_phone_number || '',
      website: place.website || ''
    };
  }

  getPriceRange(priceLevel) {
    switch (priceLevel) {
      case 0:
      case 1:
        return '$';
      case 2:
        return '$$';
      case 3:
      case 4:
        return '$$$';
      default:
        return '$$'; // Default to moderate
    }
  }

  extractDietaryOptions(types, name) {
    const options = [];
    const lowerName = name.toLowerCase();
    const lowerTypes = types.map(t => t.toLowerCase());

    // Check for vegetarian indicators
    if (lowerName.includes('vegan') || lowerTypes.includes('vegan')) {
      options.push('Vegan');
    }
    if (lowerName.includes('vegetarian') || lowerTypes.includes('vegetarian')) {
      options.push('Vegetarian');
    }
    
    // Check for gluten-free indicators
    if (lowerName.includes('gluten free') || lowerName.includes('gluten-free')) {
      options.push('Gluten-Free');
    }

    // Check for halal indicators
    if (lowerName.includes('halal') || lowerTypes.includes('halal')) {
      options.push('Halal');
    }

    // Check for pescatarian indicators (seafood restaurants)
    if (lowerTypes.includes('seafood_restaurant') || lowerName.includes('seafood')) {
      options.push('Pescatarian');
    }

    return options;
  }

  extractCuisine(types, name) {
    const lowerName = name.toLowerCase();
    const lowerTypes = types.map(t => t.toLowerCase());

    // Common cuisine mappings
    const cuisineMappings = {
      'italian_restaurant': 'Italian',
      'pizza_restaurant': 'Italian',
      'japanese_restaurant': 'Japanese',
      'sushi_restaurant': 'Japanese',
      'chinese_restaurant': 'Chinese',
      'mexican_restaurant': 'Mexican',
      'indian_restaurant': 'Indian',
      'thai_restaurant': 'Thai',
      'french_restaurant': 'French',
      'mediterranean_restaurant': 'Mediterranean',
      'greek_restaurant': 'Mediterranean',
      'american_restaurant': 'American',
      'burger_restaurant': 'American',
      'seafood_restaurant': 'Seafood',
      'steak_house': 'Steakhouse',
      'vegan_restaurant': 'Vegan',
      'vegetarian_restaurant': 'Vegetarian'
    };

    // Check types first
    for (const [type, cuisine] of Object.entries(cuisineMappings)) {
      if (lowerTypes.includes(type)) {
        return cuisine;
      }
    }

    // Check name for cuisine keywords
    if (lowerName.includes('pizza') || lowerName.includes('pasta')) return 'Italian';
    if (lowerName.includes('sushi') || lowerName.includes('ramen')) return 'Japanese';
    if (lowerName.includes('taco') || lowerName.includes('burrito')) return 'Mexican';
    if (lowerName.includes('burger')) return 'American';
    if (lowerName.includes('curry') || lowerName.includes('naan')) return 'Indian';
    if (lowerName.includes('falafel') || lowerName.includes('hummus')) return 'Mediterranean';

    // Default to International if we can't determine
    return 'International';
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return Math.round(R * c); // Distance in meters
  }

  // Get detailed place information (for restaurant detail view)
  async getPlaceDetails(placeId) {
    if (!this.google) {
      const initialized = await this.initialize();
      if (!initialized) return null;
    }

    const map = new this.google.maps.Map(document.createElement('div'));
    this.placesService = new this.google.maps.places.PlacesService(map);

    const request = {
      placeId: placeId,
      fields: ['name', 'rating', 'formatted_phone_number', 'formatted_address', 
               'website', 'opening_hours', 'photos', 'reviews', 'address_components',
               'geometry', 'types', 'price_level', 'vicinity']
    };

    return new Promise((resolve) => {
      this.placesService.getDetails(request, (place, status) => {
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          resolve(this.transformPlaceToRestaurant(place));
        } else {
          console.error('Place details API returned status:', status);
          resolve(null);
        }
      });
    });
  }
}

// Create a singleton instance
export const googleMapsService = new GoogleMapsService();

export default GoogleMapsService;