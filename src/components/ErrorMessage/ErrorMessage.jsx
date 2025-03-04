import React, { useState, useEffect } from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onDismiss, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after duration
  useEffect(() => {
    if (!duration) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for animation to complete
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  // Handle manual dismiss
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); // Wait for animation to complete
  };

  return (
    <div className={`error-message ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="error-icon">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="error-content">{message}</div>
      <button className="error-dismiss" onClick={handleDismiss}>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default ErrorMessage;