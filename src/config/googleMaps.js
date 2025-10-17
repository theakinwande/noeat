// Google Maps Configuration
const validateApiKey = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error(
      'Google Maps API key not found! Please add your API key to .env file:\n' +
      'VITE_GOOGLE_MAPS_API_KEY=your_api_key_here'
    );
    return null;
  }
  return apiKey;
};

export const GOOGLE_MAPS_CONFIG = {
  apiKey: validateApiKey(),
  libraries: ['places', 'geometry'],
  version: 'weekly',
  region: 'US', // Set your default region
  language: 'en' // Set your default language
};

// Instructions to get your API key:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable the Google Maps JavaScript API and Places API
// 4. Create credentials (API key)
// 5. Restrict the API key to your domain
// 6. Replace 'YOUR_GOOGLE_MAPS_API_KEY_HERE' with your actual key

export default GOOGLE_MAPS_CONFIG;