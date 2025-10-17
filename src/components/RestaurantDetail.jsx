import React from 'react';

const RestaurantDetail = ({ restaurant, onClose }) => {
  if (!restaurant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold">{restaurant.name}</h2>
              <div className="detail-meta">
                <div className="detail-rating">
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
                  <span className="rating-text">{restaurant.rating}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-600">{restaurant.cuisine}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="font-medium">{restaurant.priceRange}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700">{restaurant.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-700">{restaurant.address}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Dietary Options</h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.dietaryOptions.map(option => (
                <span key={option} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  {option}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurant.menu.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.name}</h4>
                    <span className="text-orange-600 font-medium">${item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Reviews</h3>
            {restaurant.reviews.map((review, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-medium">{review.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{review.author}</p>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`star ${i < Math.floor(review.rating) ? 'star-filled' : 'star-empty'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t px-6 py-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;