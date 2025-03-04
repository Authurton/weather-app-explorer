import React, { useEffect, useContext, useRef } from 'react';
import { fetchWeatherByCoordinates } from '../../api/weatherApi';
import { ThemeContext } from '../../contexts/ThemeContext';
import './WeatherDetails.css';

const WeatherDetails = ({ 
  location, 
  weatherData, 
  setWeatherData,
  isLoading, 
  setIsLoading, 
  onClose, 
  onError 
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const getWeatherData = async () => {
      if (!location || isFetchingRef.current) return;
      isFetchingRef.current = true;
      setIsLoading(true);
      try {
        const data = await fetchWeatherByCoordinates(location.lat, location.lng);
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        onError(`Failed to get weather data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    getWeatherData();
  }, [location, onError, setIsLoading, setWeatherData]); 
  
  const formatTemp = (temp) => {
    return Math.round(temp * 10) / 10;
  };

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className={`weather-panel ${isDarkMode ? 'dark' : ''}`}>
      <div className="weather-header">
        <h2>Weather Information</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="weather-content">
        {isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        ) : weatherData ? (
          <>
            <div className="location-info">
              <h3>{weatherData.name || 'Unknown Location'}</h3>
              <p className="coordinates">
                {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
              </p>
            </div>
            
            <div className="weather-main">
              <div className="temp-container">
                <div className="current-temp">
                  {formatTemp(weatherData.main.temp)}°C
                </div>
                <div className="feels-like">
                  Feels like {formatTemp(weatherData.main.feels_like)}°C
                </div>
              </div>
              
              <div className="weather-icon-container">
                {weatherData.weather[0].icon && (
                  <img 
                    src={getWeatherIconUrl(weatherData.weather[0].icon)} 
                    alt={weatherData.weather[0].description}
                    className="weather-icon"
                  />
                )}
                <div className="weather-description">
                  {weatherData.weather[0].description}
                </div>
              </div>
            </div>
            
            <div className="weather-details-grid">
              <div className="detail-item">
                <div className="detail-label">Humidity</div>
                <div className="detail-value">{weatherData.main.humidity}%</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Wind</div>
                <div className="detail-value">{weatherData.wind.speed} m/s</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Pressure</div>
                <div className="detail-value">{weatherData.main.pressure} hPa</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Visibility</div>
                <div className="detail-value">{(weatherData.visibility / 1000).toFixed(1)} km</div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>Select a location on the map to view weather information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails;