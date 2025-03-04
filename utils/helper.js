/**
 * Format temperature to show one decimal place
 * @param {number} temp - Temperature value
 * @returns {number} - Formatted temperature
 */
export const formatTemperature = (temp) => {
    return Math.round(temp * 10) / 10;
  };
  
  /**
   * Get weather icon URL from OpenWeatherMap
   * @param {string} iconCode - Weather icon code
   * @returns {string} - Icon URL
   */
  export const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  
  /**
   * Format wind direction from degrees to cardinal direction
   * @param {number} degrees - Wind direction in degrees
   * @returns {string} - Cardinal direction (N, NE, E, etc.)
   */
  export const formatWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };
  
  /**
   * Convert visibility from meters to kilometers
   * @param {number} meters - Visibility in meters
   * @returns {string} - Formatted visibility in km
   */
  export const formatVisibility = (meters) => {
    return (meters / 1000).toFixed(1);
  };
  
  /**
   * Format date and time from Unix timestamp
   * @param {number} timestamp - Unix timestamp in seconds
   * @param {string} timezone - Timezone shift in seconds
   * @returns {string} - Formatted date and time
   */
  export const formatDateTime = (timestamp, timezone) => {
    // Convert timestamp to milliseconds and adjust for timezone
    const date = new Date((timestamp + timezone) * 1000);
    
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  /**
   * Validate OpenWeatherMap API key format
   * @param {string} apiKey - API key to validate
   * @returns {boolean} - True if valid format, false otherwise
   */
  export const isValidApiKey = (apiKey) => {
    // OpenWeatherMap API keys are typically 32 characters
    return apiKey && typeof apiKey === 'string' && apiKey.length >= 32;
  };