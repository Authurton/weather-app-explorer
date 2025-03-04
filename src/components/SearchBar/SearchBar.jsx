import React, { useState, useContext, useRef, useEffect } from 'react';
import { searchCity } from '../../api/weatherApi';
import { ThemeContext } from '../../contexts/ThemeContext';
import './SearchBar.css';

const SearchBar = ({ onSearch, onError }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
  
    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchCity(query);
        setSearchResults(results);
        setIsOpen(results.length > 0);
      } catch (error) {
        onError?.(`Search failed: ${error.message}`); 
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  
    return () => clearTimeout(debounceTimer);
  }, [query, onError, setSearchResults, setIsOpen]);

  const handleSelectCity = (city) => {
    setQuery(city.name);
    setIsOpen(false);
    onSearch(city);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchCity(query);
      if (results.length > 0) {
        handleSelectCity(results[0]);
      } else {
        onError('No cities found with that name');
      }
    } catch (error) {
      onError(`Search failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`search-container ${isDarkMode ? 'dark' : ''}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(searchResults.length > 0)}
        />
        <button type="submit" className="search-button">
          {isLoading ? (
            <span className="search-spinner"></span>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </button>
      </form>
      
      {isOpen && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((city, index) => (
            <div 
              key={`${city.name}-${city.country}-${index}`}
              className="search-result-item"
              onClick={() => handleSelectCity(city)}
            >
              <div className="city-name">{city.name}</div>
              <div className="city-country">{city.country}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;