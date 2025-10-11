import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import RestaurantList from './components/RestaurantList'
import RestaurantDetail from './components/RestaurantDetail'
import { restaurants as mockRestaurants } from './data/restaurants'
import { useGoogleRestaurants } from './hooks/useGoogleRestaurants'

function App() {
  const { restaurants: googleRestaurants, loading, initialized, fetchRestaurants } = useGoogleRestaurants();
  const [allRestaurants, setAllRestaurants] = useState(mockRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: 'All',
    price: 'all',
    dietary: []
  });
  const [useGoogleData, setUseGoogleData] = useState(false);

  // Handle search suggestions from no-results page
  useEffect(() => {
    const handleSearchSuggestion = (event) => {
      const suggestion = event.detail;
      setSearchQuery(suggestion);
      // Use a timeout to avoid immediate execution issues
      setTimeout(() => {
        handleSearch(suggestion);
      }, 0);
    };
    
    window.addEventListener('searchSuggestion', handleSearchSuggestion);
    return () => window.removeEventListener('searchSuggestion', handleSearchSuggestion);
  }, []); // Empty dependency array since handleSearch is defined in the same component

  // Apply filters when they change
  useEffect(() => {
    let results = allRestaurants;
    
    // Filter by search query (location)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(restaurant => 
        restaurant.address.toLowerCase().includes(query)
      );
    }
    
    // Filter by cuisine
    if (filters.cuisine !== 'All') {
      results = results.filter(restaurant => 
        restaurant.cuisine === filters.cuisine
      );
    }
    
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
          restaurant.dietaryOptions.includes(option)
        )
      );
    }
    
    setFilteredRestaurants(results);
  }, [searchQuery, filters, allRestaurants]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    // If Google Maps is initialized and we have a location query, fetch real restaurants
    if (initialized && query.trim()) {
      try {
        const googleResults = await fetchRestaurants(query, filters.cuisine);
        if (googleResults && googleResults.length > 0) {
          setUseGoogleData(true);
          setAllRestaurants(googleResults);
        } else {
          // Fall back to mock data if Google search fails
          setUseGoogleData(false);
          setAllRestaurants(mockRestaurants);
        }
      } catch (err) {
        console.error('Failed to fetch from Google Maps:', err);
        setUseGoogleData(false);
        setAllRestaurants(mockRestaurants);
      }
    } else if (!query.trim()) {
      // Reset to mock data when search is cleared
      setUseGoogleData(false);
      setAllRestaurants(mockRestaurants);
    }
  };

  const handleViewDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleCloseDetails = () => {
    setSelectedRestaurant(null);
  };

  return (
    <Layout>
      <div className="hero">
        <div className="container">
          <h1 className="hero-title">Find Your Next Meal</h1>
          <p className="hero-subtitle">Discover restaurants based on your preferences</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="container">
        <div className="filters-section">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'} Found
            </h2>
            {useGoogleData && (
              <div className="google-maps-indicator">
                <span className="google-maps-badge">🗺️ Real Places</span>
                <span className="google-maps-text">Powered by Google Maps</span>
              </div>
            )}
          </div>
          
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Searching for restaurants...</p>
            </div>
          )}
          
          {!loading && (
            <RestaurantList 
          restaurants={filteredRestaurants} 
          onViewDetails={handleViewDetails} 
          searchQuery={searchQuery}
        />
          )}
        </div>
      </div>
      
      {selectedRestaurant && (
        <RestaurantDetail 
          restaurant={selectedRestaurant} 
          onClose={handleCloseDetails} 
        />
      )}
    </Layout>
  )
}

export default App