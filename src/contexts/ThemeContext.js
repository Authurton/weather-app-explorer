import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference saved in localStorage
  const storedTheme = localStorage.getItem('weatherMapTheme');
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial state based on stored preference or system preference
  const [isDarkMode, setIsDarkMode] = useState(
    storedTheme ? storedTheme === 'dark' : prefersDarkMode
  );

  // Update the DOM when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('weatherMapTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};