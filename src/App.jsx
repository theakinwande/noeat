import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import RestaurantList from './components/RestaurantList'
import RestaurantDetail from './components/RestaurantDetail'
import { restaurants } from './data/restaurants'

function App() {
  const [allRestaurants] = useState(restaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: 'All',
    price: 'all',
    dietary: []
  });

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

  const handleSearch = (query) => {
    setSearchQuery(query);
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
          </div>
          <RestaurantList 
            restaurants={filteredRestaurants} 
            onViewDetails={handleViewDetails} 
          />
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