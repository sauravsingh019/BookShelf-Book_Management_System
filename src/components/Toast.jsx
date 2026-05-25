import React, { useCallback, useEffect, useState } from 'react';

const TOAST_CONFIG = {
  success: { label: 'Success' },
  error:   { label: 'Error' },
  info:    { label: 'Info' },
};

const ICONS = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

const DURATION = 3200;

const Toast = ({ message, type = 'success', onClose }) => {
  const [exiting, setExiting] = useState(false);

  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const timeoutId = setTimeout(handleClose, DURATION);
    return () => clearTimeout(timeoutId);
  }, [handleClose]);

  const config = TOAST_CONFIG[type] || TOAST_CONFIG.success;

  return (
    <div className={`toast toast--${type} ${exiting ? 'toast--exit' : ''}`}>
      <div className="toast__body">
        <div className="toast__icon">
          {ICONS[type] || ICONS.success}
        </div>
        <div className="toast__content">
          <div className="toast__label">{config.label}</div>
          <p className="toast__message">{message}</p>
        </div>
        <button
          className="toast__close"
          onClick={handleClose}
          aria-label="Dismiss notification"
        >
          {ICONS.close}
        </button>
      </div>
      <div className="toast__progress" />
    </div>
  );
};

export default Toast;
