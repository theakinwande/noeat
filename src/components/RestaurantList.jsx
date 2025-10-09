import React from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants, onViewDetails }) => {
  if (restaurants.length === 0) {
    return (
      <div className="no-results">
        <svg className="no-results-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="no-results-title">No restaurants found</h3>
        <p className="no-results-text">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      {restaurants.map(restaurant => (
        <RestaurantCard 
          key={restaurant.id} 
          restaurant={restaurant} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};

export default RestaurantList;