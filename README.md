# Weather Map Explorer

A React application that displays weather data for different locations on an interactive map using React Leaflet. Users can click on any location or search for a city to view detailed weather information.

## Features

### Core Features
- **Interactive Map**: Displays a world map using React Leaflet where users can click on any location to select it.
- **API Integration**: Fetches weather data for the selected location using the OpenWeatherMap API.
- **Weather Information**: Shows detailed weather information including location name, temperature, weather description, humidity, and wind speed.
- **Responsive Layout**: Clean and responsive design that works on desktop and mobile devices.
- **Error Handling**: Gracefully handles API errors with user-friendly error messages.

### Bonus Features
- **City Search**: Search bar that allows users to search for a city and center the map on that location.
- **Dark Mode**: Toggle between light and dark themes with persistent preferences.
- **Weather Icons**: Displays weather icons from OpenWeatherMap to visualize current conditions.
- **Additional Weather Details**: Extended weather information including feels-like temperature, pressure, and visibility.

## Tech Stack

- **React**: Frontend framework for building the user interface.
- **React Leaflet**: For map integration.
- **Fetch API**: For making HTTP requests to the OpenWeatherMap API.
- **CSS**: Pure CSS for styling with CSS variables for theming.
- **LocalStorage**: For persisting user theme preferences.

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/Authurton/weather-app-explorer.git
   cd weather-map-explorer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

   You can get a free API key by signing up at [OpenWeatherMap](https://openweathermap.org/api).

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Dependencies

- react
- react-dom
- react-leaflet
- leaflet

## Project Structure

```
/weather-map
  /public
    index.html
    favicon.ico
  /src
    /api
      weatherApi.js
    /components
      /Map
        Map.jsx
        Map.css
      /WeatherDetails
        WeatherDetails.jsx
        WeatherDetails.css
      /SearchBar
        SearchBar.jsx
        SearchBar.css
      /ErrorMessage
        ErrorMessage.jsx
        ErrorMessage.css
      /ThemeToggle
        ThemeToggle.jsx
        ThemeToggle.css
    /contexts
      ThemeContext.js
    /hooks
      useWeather.js
      useGeocoding.js
    /utils
      helpers.js
    App.jsx
    App.css
    index.js
    index.css
  package.json
  README.md
  .env
```

## Assumptions Made

- The OpenWeatherMap API key is valid and has access to the required endpoints.
- The app is intended for modern browsers that support CSS variables and modern JavaScript features.
- Users have a stable internet connection to fetch map tiles and weather data.
- The free tier of OpenWeatherMap API is sufficient for the app's usage.

## Future Improvements

- Add weather forecasts for upcoming days.
- Implement geolocation to automatically detect and display the user's current location.
- Add weather history graphs for selected locations.
- Add unit conversion between Celsius and Fahrenheit.
- Implement caching to reduce API calls for frequently accessed locations.

## License

MIT