# Tara Beach Resort

A React-based hotel room browsing app powered by Contentful CMS. Users can explore available rooms, filter by type, capacity, price, and amenities, and view detailed information for each room.

The app is fully responsive and optimized for mobile, tablet, and desktop screen sizes.

## Tech Stack

- **React 19** with Context API for global state
- **React Router v7** for client-side routing
- **Contentful** as headless CMS (room data and images)
- **Styled Components v6** for dynamic styling
- **React Icons** for UI icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```
REACT_APP_API_SPACE=your_contentful_space_id
REACT_APP_ACCESS_TOKEN=your_contentful_access_token
```

Find these in your Contentful dashboard under **Settings > API keys**.

### 3. Run the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Routes

| Path | Description |
|---|---|
| `/` | Home page — hero banner, services overview, featured rooms |
| `/rooms` | Room listing with filter sidebar |
| `/rooms/:slug` | Single room detail page |
| `*` | 404 error page |

## Room Filters

The `/rooms` page supports filtering by:

- **Room type** (single, double, suite, etc.)
- **Guest capacity**
- **Max price** (range slider)
- **Room size** (min/max sqft)
- **Breakfast included**
- **Pets allowed**

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |