import { useState, useCallback } from 'react';
import { searchCity } from '../api/weatherApi';

/**
 * Custom hook for geocoding operations
 */
export const useGeocoding = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Search for a city by name
   * @param {string} query - City name to search for
   * @returns {Array} - Array of city results
   */
  const searchLocation = useCallback(async (query) => {
    if (!query || query.trim() === '') {
      setSearchResults([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchCity(query);
      setSearchResults(results);
      return results;
    } catch (err) {
      setError(err.message || 'Failed to search for location');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear current search results
   */
  const clearResults = useCallback(() => {
    setSearchResults([]);
  }, []);

  /**
   * Clear current error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    searchResults,
    isLoading,
    error,
    searchLocation,
    clearResults,
    clearError
  };
};