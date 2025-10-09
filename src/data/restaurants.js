export const restaurants = [
  {
    id: 1,
    name: "Pasta Paradise",
    cuisine: "Italian",
    priceRange: "$$",
    rating: 4.5,
    address: "123 Main St, Foodville",
    dietaryOptions: ["Vegetarian", "Gluten-Free"],
    image: "https://placehold.co/800x600/FF6B6B/FFFFFF?text=Pasta%0AParadise",
    description: "Authentic Italian cuisine with homemade pasta and wood-fired pizzas.",
    menu: [
      { name: "Spaghetti Carbonara", price: 14.99, description: "Classic carbonara with pancetta and egg" },
      { name: "Margherita Pizza", price: 12.99, description: "Fresh mozzarella, tomatoes, and basil" },
      { name: "Tiramisu", price: 7.99, description: "Traditional Italian dessert" }
    ],
    reviews: [
      { author: "Maria G.", rating: 5, comment: "Best Italian food in town!" },
      { author: "John D.", rating: 4, comment: "Great atmosphere and delicious pasta." }
    ]
  },
  {
    id: 2,
    name: "Sushi Sensation",
    cuisine: "Japanese",
    priceRange: "$$$",
    rating: 4.8,
    address: "456 Ocean Ave, Seafood City",
    dietaryOptions: ["Pescatarian", "Gluten-Free"],
    image: "https://placehold.co/800x600/4ECDC4/FFFFFF?text=Sushi%0ASensation",
    description: "Premium sushi and Japanese specialties using the freshest ingredients.",
    menu: [
      { name: "Rainbow Roll", price: 18.99, description: "Assorted fish on California roll" },
      { name: "Miso Soup", price: 4.99, description: "Traditional Japanese soup" },
      { name: "Green Tea Ice Cream", price: 5.99, description: "Refreshing dessert" }
    ],
    reviews: [
      { author: "Alex T.", rating: 5, comment: "Freshest sushi I've ever had!" },
      { author: "Sarah M.", rating: 4.5, comment: "Amazing quality and presentation." }
    ]
  },
  {
    id: 3,
    name: "Burger Bistro",
    cuisine: "American",
    priceRange: "$$",
    rating: 4.2,
    address: "789 Grill St, Meatville",
    dietaryOptions: ["Vegetarian"],
    image: "https://placehold.co/800x600/DDA0DD/333333?text=Burger%0ABistro",
    description: "Gourmet burgers with creative toppings and craft beers.",
    menu: [
      { name: "Classic Cheeseburger", price: 12.99, description: "Angus beef with cheddar" },
      { name: "Veggie Burger", price: 11.99, description: "House-made black bean patty" },
      { name: "Truffle Fries", price: 6.99, description: "With parmesan and herbs" }
    ],
    reviews: [
      { author: "Mike R.", rating: 4, comment: "Juicy burgers and great service!" },
      { author: "Lisa K.", rating: 4.5, comment: "Best fries in town." }
    ]
  },
  {
    id: 4,
    name: "Spice Garden",
    cuisine: "Indian",
    priceRange: "$$",
    rating: 4.6,
    address: "101 Curry Lane, Spiceville",
    dietaryOptions: ["Vegetarian", "Vegan", "Halal"],
    image: "https://placehold.co/800x600/FF7F50/FFFFFF?text=Spice%0AGarden",
    description: "Authentic Indian cuisine with rich flavors and aromatic spices.",
    menu: [
      { name: "Butter Chicken", price: 15.99, description: "Creamy tomato sauce with tender chicken" },
      { name: "Vegetable Biryani", price: 13.99, description: "Fragrant rice with mixed vegetables" },
      { name: "Garlic Naan", price: 3.99, description: "Freshly baked bread with garlic" }
    ],
    reviews: [
      { author: "Priya S.", rating: 5, comment: "Reminds me of home cooking!" },
      { author: "Tom B.", rating: 4, comment: "Great flavors, though a bit spicy for me." }
    ]
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    priceRange: "$",
    rating: 4.3,
    address: "222 Salsa St, Spicytown",
    dietaryOptions: ["Vegetarian", "Gluten-Free"],
    image: "https://placehold.co/800x600/FFE66D/333333?text=Taco%0AFiesta",
    description: "Authentic Mexican street food with homemade salsas and fresh ingredients.",
    menu: [
      { name: "Street Tacos (3)", price: 9.99, description: "Choice of meat with onion and cilantro" },
      { name: "Guacamole & Chips", price: 7.99, description: "Fresh avocado dip with tortilla chips" },
      { name: "Churros", price: 5.99, description: "Fried dough with cinnamon sugar" }
    ],
    reviews: [
      { author: "Carlos M.", rating: 4.5, comment: "Most authentic tacos in the area!" },
      { author: "Emily W.", rating: 4, comment: "Great value and delicious food." }
    ]
  },
  {
    id: 6,
    name: "Golden Dragon",
    cuisine: "Chinese",
    priceRange: "$$",
    rating: 4.4,
    address: "333 Wok Way, Chinatown",
    dietaryOptions: ["Vegetarian"],
    image: "https://placehold.co/800x600/DC143C/FFFFFF?text=Golden%0ADragon",
    description: "Traditional Chinese dishes with a modern twist.",
    menu: [
      { name: "Kung Pao Chicken", price: 14.99, description: "Spicy stir-fry with peanuts" },
      { name: "Vegetable Lo Mein", price: 11.99, description: "Noodles with mixed vegetables" },
      { name: "Egg Rolls (4)", price: 6.99, description: "Crispy appetizer with dipping sauce" }
    ],
    reviews: [
      { author: "David L.", rating: 4, comment: "Great flavors and large portions!" },
      { author: "Grace H.", rating: 5, comment: "Best Chinese food I've had outside of China." }
    ]
  },
  {
    id: 7,
    name: "Mediterranean Oasis",
    cuisine: "Mediterranean",
    priceRange: "$$",
    rating: 4.7,
    address: "444 Olive Blvd, Greekytown",
    dietaryOptions: ["Vegetarian", "Vegan", "Halal"],
    image: "https://placehold.co/800x600/95E1D3/333333?text=Mediterranean%0AOasis",
    description: "Fresh Mediterranean cuisine with a focus on healthy ingredients.",
    menu: [
      { name: "Falafel Plate", price: 13.99, description: "With hummus, tabouleh, and pita" },
      { name: "Lamb Gyro", price: 15.99, description: "Slow-roasted lamb with tzatziki" },
      { name: "Baklava", price: 4.99, description: "Sweet pastry with honey and nuts" }
    ],
    reviews: [
      { author: "Sophia K.", rating: 5, comment: "Best hummus I've ever tasted!" },
      { author: "Ryan M.", rating: 4.5, comment: "Great healthy options and amazing flavors." }
    ]
  },
  {
    id: 8,
    name: "Vegan Delight",
    cuisine: "Vegan",
    priceRange: "$$$",
    rating: 4.5,
    address: "555 Green St, Plantville",
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free"],
    image: "https://placehold.co/800x600/98D8C8/333333?text=Vegan%0ADelight",
    description: "Creative plant-based cuisine that satisfies even non-vegans.",
    menu: [
      { name: "Impossible Burger", price: 16.99, description: "Plant-based patty with all the fixings" },
      { name: "Cauliflower Buffalo Wings", price: 12.99, description: "Crispy cauliflower with hot sauce" },
      { name: "Raw Cheesecake", price: 8.99, description: "Cashew-based dessert with berry topping" }
    ],
    reviews: [
      { author: "Olivia P.", rating: 5, comment: "You won't believe it's all vegan!" },
      { author: "James T.", rating: 4, comment: "As a carnivore, I was pleasantly surprised." }
    ]
  }
];

export const cuisineTypes = [
  "All",
  "Italian",
  "Japanese",
  "American",
  "Indian",
  "Mexican",
  "Chinese",
  "Mediterranean",
  "Vegan"
];

export const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Pescatarian"
];

export const priceRanges = [
  { label: "All", value: "all" },
  { label: "Inexpensive ($)", value: "$" },
  { label: "Moderate ($$)", value: "$$" },
  { label: "Expensive ($$$)", value: "$$$" }
];