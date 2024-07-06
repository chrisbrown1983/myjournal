// Toast.js
import React, { useEffect } from 'react';
import './Toast.css'; // You can create a CSS file for styling the toast

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Hide the toast after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default Toast;
