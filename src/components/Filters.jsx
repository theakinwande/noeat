import React, { useState, useEffect } from 'react';
import { cuisineTypes, dietaryOptions, priceRanges } from '../data/restaurants';

const Filters = ({ filters, setFilters }) => {
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    let count = 0;
    if (filters.cuisine !== 'All') count++;
    if (filters.price !== 'all') count++;
    if (filters.distance && filters.distance !== 5000) count++;
    if (filters.openNow) count++;
    if (filters.minRating && filters.minRating > 0) count++;
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
      dietary: [],
      distance: 5000,
      openNow: false,
      minRating: 0,
      compareToUserLocation: true
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
        <h3 className="filter-label">Location Options</h3>
        <div className="location-options">
          <label className="location-toggle">
            <input
              type="checkbox"
              checked={filters.compareToUserLocation}
              onChange={(e) => setFilters({ ...filters, compareToUserLocation: e.target.checked })}
              className="location-checkbox"
            />
            Compare distances to my location
          </label>
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-label">Distance</h3>
        <div className="distance-filter">
          <input
            type="range"
            min="1000"
            max="20000"
            step="1000"
            value={filters.distance || 5000}
            onChange={(e) => setFilters({ ...filters, distance: parseInt(e.target.value) })}
            className="distance-slider"
          />
          <div className="distance-labels">
            <span>1km</span>
            <span className="distance-value">{(filters.distance || 5000) / 1000}km</span>
            <span>20km</span>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-label">Minimum Rating</h3>
        <div className="rating-filter">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating || 0}
            onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
            className="rating-slider"
          />
          <div className="rating-labels">
            <span>Any</span>
            <span className="rating-value">{(filters.minRating || 0).toFixed(1)}★</span>
            <span>5★</span>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-label">Operating Hours</h3>
        <div className="hours-filter">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.openNow || false}
              onChange={(e) => setFilters({ ...filters, openNow: e.target.checked })}
            />
            <span className="checkbox-text">Open Now</span>
          </label>
        </div>
      </div>
      
      <div className="filter-group">
        <h3 className="filter-label">Dietary Preferences</h3>
        <div className="filter-buttons">
          {dietaryOptions.map(option => (
            <button
              key={option}
              onClick={() => handleDietaryToggle(option)}
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