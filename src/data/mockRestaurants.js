export const mockRestaurants = [
  {
    id: '1',
    name: 'The Rustic Kitchen',
    cuisine: 'American',
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 128,
    address: '123 Main Street, New York, NY 10001',
    dietaryOptions: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    description: 'Farm-to-table American cuisine in a cozy atmosphere',
    distance: 0.5,
    isOpen: true,
    phoneNumber: '(212) 555-0123',
    website: 'https://example.com/rustic-kitchen'
  },
  {
    id: '2',
    name: 'Sushi Master',
    cuisine: 'Japanese',
    priceRange: '$$$',
    rating: 4.8,
    reviewCount: 256,
    address: '456 Sushi Lane, New York, NY 10002',
    dietaryOptions: ['Vegetarian', 'Pescatarian'],
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    description: 'Premium sushi experience with fresh daily catches',
    distance: 1.2,
    isOpen: true,
    phoneNumber: '(212) 555-0124',
    website: 'https://example.com/sushi-master'
  },
  {
    id: '3',
    name: 'Bella Italia',
    cuisine: 'Italian',
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 189,
    address: '789 Pizza Ave, New York, NY 10003',
    dietaryOptions: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    description: 'Authentic Italian pizzas and pastas',
    distance: 0.8,
    isOpen: true,
    phoneNumber: '(212) 555-0125',
    website: 'https://example.com/bella-italia'
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    priceRange: '$',
    rating: 4.4,
    reviewCount: 312,
    address: '321 Taco Street, New York, NY 10004',
    dietaryOptions: ['Vegetarian', 'Vegan'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    description: 'Vibrant Mexican street food experience',
    distance: 1.5,
    isOpen: true,
    phoneNumber: '(212) 555-0126',
    website: 'https://example.com/taco-fiesta'
  },
  {
    id: '5',
    name: 'Golden Dragon',
    cuisine: 'Chinese',
    priceRange: '$$',
    rating: 4.3,
    reviewCount: 245,
    address: '567 Dragon Road, New York, NY 10005',
    dietaryOptions: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
    description: 'Traditional Chinese cuisine with modern twist',
    distance: 2.0,
    isOpen: true,
    phoneNumber: '(212) 555-0127',
    website: 'https://example.com/golden-dragon'
  },
  {
    id: '6',
    name: 'Le Petit Bistro',
    cuisine: 'French',
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 167,
    address: '890 Bistro Lane, New York, NY 10006',
    dietaryOptions: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800',
    description: 'Classic French bistro with romantic atmosphere',
    distance: 1.7,
    isOpen: true,
    phoneNumber: '(212) 555-0128',
    website: 'https://example.com/le-petit-bistro'
  },
  {
    id: '7',
    name: 'Spice Route',
    cuisine: 'Indian',
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 203,
    address: '432 Curry Street, New York, NY 10007',
    dietaryOptions: ['Vegetarian', 'Vegan', 'Halal'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    description: 'Authentic Indian cuisine with rich flavors',
    distance: 2.5,
    isOpen: true,
    phoneNumber: '(212) 555-0129',
    website: 'https://example.com/spice-route'
  },
  {
    id: '8',
    name: 'Mediterranean Oasis',
    cuisine: 'Mediterranean',
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 178,
    address: '765 Med Ave, New York, NY 10008',
    dietaryOptions: ['Vegetarian', 'Vegan', 'Halal'],
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800',
    description: 'Fresh Mediterranean dishes with ocean views',
    distance: 1.9,
    isOpen: true,
    phoneNumber: '(212) 555-0130',
    website: 'https://example.com/mediterranean-oasis'
  }
];

export const cuisineTypes = [
  'All',
  'American',
  'Japanese',
  'Italian',
  'Mexican',
  'Chinese',
  'French',
  'Indian',
  'Mediterranean'
];

export const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Halal',
  'Pescatarian'
];

export const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '$', label: '$' },
  { value: '$$', label: '$$' },
  { value: '$$$', label: '$$$' }
];