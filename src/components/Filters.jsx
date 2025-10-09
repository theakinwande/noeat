import React, { useState, useEffect } from 'react';
import { cuisineTypes, dietaryOptions, priceRanges } from '../data/restaurants';

const Filters = ({ filters, setFilters }) => {
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    let count = 0;
    if (filters.cuisine !== 'All') count++;
    if (filters.price !== 'all') count++;
    count += filters.dietary.length;
    setActiveFilterCount(count);
  }, [filters]);

  const handleCuisineChange = (cuisine) => {
    setFilters({ ...filters, cuisine });
  };

  const handlePriceChange = (price) => {
    setFilters({ ...filters, price });
  };

  const handleDietaryChange = (option) => {
    const updatedDietary = filters.dietary.includes(option)
      ? filters.dietary.filter(item => item !== option)
      : [...filters.dietary, option];
    
    setFilters({ ...filters, dietary: updatedDietary });
  };

  const clearAllFilters = () => {
    setFilters({
      cuisine: 'All',
      price: 'all',
      dietary: []
    });
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <h2 className="filters-title">Filters</h2>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="clear-filters-button">
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>
      
      <div className="filter-group">
        <h3 className="filter-label">Cuisine Type</h3>
        <div className="filter-buttons">
          {cuisineTypes.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineChange(cuisine)}
              className={`filter-button ${
                filters.cuisine === cuisine ? 'filter-button-active' : ''
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
      
      <div className="filter-group">
        <h3 className="filter-label">Price Range</h3>
        <div className="filter-buttons">
          {priceRanges.map((price) => (
            <button
              key={price.value}
              onClick={() => handlePriceChange(price.value)}
              className={`filter-button ${
                filters.price === price.value ? 'filter-button-active' : ''
              }`}
            >
              {price.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="filter-group">
        <h3 className="filter-label">Dietary Preferences</h3>
        <div className="filter-buttons">
          {dietaryOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleDietaryChange(option)}
              className={`filter-button ${
                filters.dietary.includes(option) ? 'filter-button-active' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;