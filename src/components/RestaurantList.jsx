import React from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants, onViewDetails, searchQuery }) => {
  if (restaurants.length === 0) {
    return (
      <div className="no-results-container">
        <div className="no-results-card">
          <div className="no-results-icon-wrapper">
            <svg className="no-results-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l.01.01" />
            </svg>
          </div>
          <h3 className="no-results-title">
            {searchQuery ? `No restaurants found for "${searchQuery}"` : 'No restaurants found'}
          </h3>
          <p className="no-results-description">
            {searchQuery 
              ? "Try searching for a different location or check your spelling."
              : "Try searching for your city or adjust your filters to discover amazing restaurants!"
            }
          </p>
          <div className="no-results-suggestions">
            <h4 className="suggestions-title">Popular searches:</h4>
            <div className="suggestion-tags">
              <button className="suggestion-tag" onClick={() => window.dispatchEvent(new CustomEvent('searchSuggestion', { detail: 'New York' }))}>
                New York
              </button>
              <button className="suggestion-tag" onClick={() => window.dispatchEvent(new CustomEvent('searchSuggestion', { detail: 'Los Angeles' }))}>
                Los Angeles
              </button>
              <button className="suggestion-tag" onClick={() => window.dispatchEvent(new CustomEvent('searchSuggestion', { detail: 'Chicago' }))}>
                Chicago
              </button>
              <button className="suggestion-tag" onClick={() => window.dispatchEvent(new CustomEvent('searchSuggestion', { detail: 'Miami' }))}>
                Miami
              </button>
            </div>
          </div>
          <div className="no-results-illustration">
            <svg className="illustration-svg" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" stroke="var(--border)" strokeWidth="2" strokeDasharray="5 5" opacity="0.3"/>
              <path d="M60 120 Q100 80 140 120" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
              <circle cx="80" cy="110" r="8" fill="var(--accent)" opacity="0.8"/>
              <circle cx="120" cy="110" r="8" fill="var(--accent)" opacity="0.8"/>
              <path d="M85 130 Q100 140 115 130" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
            </svg>
          </div>
        </div>
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