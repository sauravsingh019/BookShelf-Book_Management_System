import React from 'react';

const ConfirmDialog = ({ title, message, onConfirm, onCancel, loading }) => (
  <div className="confirm-overlay" onClick={onCancel}>
    <div
      className="confirm-dialog"
      onClick={(e) => e.stopPropagation()}
      role="alertdialog"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
    >
      <div className="confirm-dialog__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <h2 className="confirm-dialog__title" id="confirm-title">
        {title || 'Are you sure?'}
      </h2>
      <p className="confirm-dialog__message" id="confirm-message">
        {message || 'This action cannot be undone.'}
      </p>
      <div className="confirm-dialog__actions">
        <button
          className="btn btn--secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn--danger-solid"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Deleting…' : 'Yes, Delete'}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
