import { useState, useCallback } from 'react';
import { fetchWeatherByCoordinates } from '../api/weatherApi';

/**
 * Custom hook for fetching and managing weather data
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch weather data for a specific location
   * @param {Object} location - Location object with lat and lng properties
   */
  const fetchWeather = useCallback(async (location) => {
    if (!location) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCoordinates(location.lat, location.lng);
      setWeatherData(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear current weather data
   */
  const clearWeather = useCallback(() => {
    setWeatherData(null);
  }, []);

  /**
   * Clear current error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weatherData,
    isLoading,
    error,
    fetchWeather,
    clearWeather,
    clearError
  };
};