import React, { useState, useEffect } from 'react';
import Map from './components/Map/Map';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import SearchBar from './components/SearchBar/SearchBar';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([-26.2041, 28.1689]); 
  const [mapZoom, setMapZoom] = useState(8); 

  useEffect(() => {
    if (selectedLocation) {
      setError(null);
    }
  }, [selectedLocation]);

  const handleLocationSelect = (latlng) => {
    setSelectedLocation(latlng);
  };

  const handleSearch = (result) => {
    if (result) {
      setMapCenter([result.lat, result.lon]);
      setMapZoom(10);
      setSelectedLocation({ lat: result.lat, lng: result.lon });
    }
  };

  const handleCloseWeather = () => {
    setWeatherData(null);
    setSelectedLocation(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="app">
        <div className="header">
          <h1>Weather Map Explorer</h1>
          <div className="controls">
            <SearchBar onSearch={handleSearch} onError={handleError} />
            <ThemeToggle />
          </div>
        </div>
        
        <div className="content">
          <Map 
            center={mapCenter}
            zoom={mapZoom}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
          {selectedLocation && (
            <WeatherDetails 
              location={selectedLocation}
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onClose={handleCloseWeather}
              onError={handleError}
            />
          )}
          
          {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;