// Google Maps Configuration
// Uses Vite environment variables - see .env file

export const GOOGLE_MAPS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
  libraries: ['places'],
  version: 'weekly'
};

// Instructions to get your API key:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable the Google Maps JavaScript API and Places API
// 4. Create credentials (API key)
// 5. Restrict the API key to your domain
// 6. Replace 'YOUR_GOOGLE_MAPS_API_KEY_HERE' with your actual key

export default GOOGLE_MAPS_CONFIG;