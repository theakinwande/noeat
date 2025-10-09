import React from 'react';

const RestaurantCard = ({ restaurant, onViewDetails }) => {
  return (
    <div className="restaurant-card">
      <div className="restaurant-image-container">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="restaurant-image"
        />
        <div className="restaurant-image-overlay">
          <span className="price-badge">
            {restaurant.priceRange}
          </span>
        </div>
      </div>
      
      <div className="restaurant-content">
        <div className="restaurant-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <div className="restaurant-rating">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`star ${i < Math.floor(restaurant.rating) ? 'star-filled' : 'star-empty'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="rating-text">{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="restaurant-info">
          <div className="restaurant-meta">
            <span className="restaurant-cuisine">{restaurant.cuisine}</span>
            <span className="separator">•</span>
            <span className="restaurant-address">{restaurant.address}</span>
          </div>
          
          <div className="dietary-tags">
            {restaurant.dietaryOptions.slice(0, 2).map(option => (
              <span key={option} className="dietary-tag">
                {option}
              </span>
            ))}
            {restaurant.dietaryOptions.length > 2 && (
              <span className="dietary-tag dietary-tag-more">
                +{restaurant.dietaryOptions.length - 2}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onViewDetails(restaurant)}
          className="view-details-button"
        >
          <span className="button-text">View Details</span>
          <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;