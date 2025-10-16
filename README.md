# NoEat — React + TypeScript + Vite

A small demo app that shows nearby restaurants using the Google Maps JavaScript API and React.

This repository is built with Vite, React (JSX/TS), Tailwind CSS, and uses the Google Maps Places API to fetch and display restaurants.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root and add your Google Maps API key:

```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:5173 (Vite default) in your browser.

## Available scripts

Scripts are defined in `package.json` and match this project:

- `npm run dev` — start the Vite dev server
- `npm run build` — run TypeScript build and generate a production build with Vite
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

Example:

```bash
npm run build
npm run preview
```

## Environment variables

This project uses Vite environment variables. The Google Maps API key should be provided as:

```
VITE_GOOGLE_MAPS_API_KEY
```

The app reads this key from `src/config/googleMaps.js` and falls back to a placeholder string if not set.

## Project structure (important files)

- `src/main.tsx` — app entry
- `src/App.jsx` — main app component
- `src/components/` — React components (Header, SearchBar, RestaurantList, RestaurantCard, RestaurantDetail, Filters, Footer, Layout)
- `src/config/googleMaps.js` — Google Maps configuration and API key usage
- `src/hooks/useGoogleRestaurants.js` — hook that fetches restaurants using the Google Maps Places API
- `src/services/googleMapsService.js` — wrapper around the Google Maps JS API
- `src/data/restaurants.js` — seed/static data used by the app

## Notes and tips

- Register and restrict your Google Maps API key to your application origin for security.
- If the map or places data doesn't load, check the browser console for API errors (billing, quota, or referrer restrictions).
- Tailwind CSS is configured in the project — edit `tailwind.config.js` and `index.css` to change styles.

## Development and linting

- ESLint is configured; run `npm run lint` to check for issues. Adjust `eslint.config.js` as needed.
- TypeScript types are included; `npm run build` runs `tsc -b` before `vite build`.

## License

This project is provided as-is.

---

If you'd like, I can also: add a minimal CONTRIBUTING.md, create a `.env.example`, or wire up GitHub Actions to run lint/build on push. Tell me which you'd prefer.
