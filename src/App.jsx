import { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import { useGoogleRestaurants } from './hooks/useGoogleRestaurants';

function App() {
  const { 
    restaurants: googleRestaurants, 
    loading, 
    initialized, 
    fetchRestaurants, 
    userLocation 
  } = useGoogleRestaurants();

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: 'All',
    price: 'all',
    dietary: [],
    distance: 5000,
    openNow: false,
    minRating: 0,
    compareToUserLocation: true
  });
  const [error, setError] = useState(null);

  // Update restaurants when Google data changes
  useEffect(() => {
    if (googleRestaurants?.length > 0) {
      setAllRestaurants(googleRestaurants);
      setFilteredRestaurants(googleRestaurants);
    }
  }, [googleRestaurants]);

  // Handle search
  const handleSearch = useCallback(async (location) => {
    setSearchQuery(location);
    setError(null);

    try {
      if (!initialized) {
        setError('Google Maps is not initialized. Please try again in a moment.');
        return;
      }

      const results = await fetchRestaurants(
        location,
        filters.distance,
        filters.cuisine,
        filters.compareToUserLocation
      );
      
      if (results?.length > 0) {
        setAllRestaurants(results);
        setFilteredRestaurants(results);
      } else {
        setAllRestaurants([]);
        setFilteredRestaurants([]);
        setError('No restaurants found in this area. Try a different location or cuisine type.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch restaurants. Please try again.');
    }
  }, [initialized, fetchRestaurants, filters.distance, filters.cuisine]);

  // Handle search suggestions
  useEffect(() => {
    const handleSearchSuggestion = (event) => {
      handleSearch(event.detail);
    };
    
    window.addEventListener('searchSuggestion', handleSearchSuggestion);
    return () => window.removeEventListener('searchSuggestion', handleSearchSuggestion);
  }, [handleSearch]);

  // Apply filters
  useEffect(() => {
    if (!allRestaurants.length) return;

    let results = [...allRestaurants];
    
    // Filter by price
    if (filters.price !== 'all') {
      results = results.filter(restaurant => 
        restaurant.priceRange === filters.price
      );
    }
    
    // Filter by dietary preferences
    if (filters.dietary.length > 0) {
      results = results.filter(restaurant => 
        filters.dietary.every(option => 
          restaurant.dietaryOptions?.includes(option)
        )
      );
    }

    // Filter by minimum rating
    if (filters.minRating > 0) {
      results = results.filter(restaurant => 
        restaurant.rating >= filters.minRating
      );
    }

    setFilteredRestaurants(results);
  }, [filters, allRestaurants]);

  return (
    <Layout>
      <div className="app-container">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
          <Filters 
            filters={filters} 
            setFilters={setFilters} 
            loading={loading}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Searching for restaurants...</p>
          </div>
        ) : (
          <RestaurantList 
            restaurants={filteredRestaurants}
            onViewDetails={setSelectedRestaurant}
            searchQuery={searchQuery}
          />
        )}

        {selectedRestaurant && (
          <RestaurantDetail 
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;