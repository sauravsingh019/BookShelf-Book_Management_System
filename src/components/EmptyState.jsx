import React from 'react';

const ICONS = {
  empty: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="13" y2="11" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

const EmptyState = ({
  variant = 'empty',
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const colorClass =
    variant === 'empty'
      ? 'empty-state__icon--amber'
      : variant === 'search'
      ? 'empty-state__icon--blue'
      : 'empty-state__icon--rose';

  return (
    <section className="empty-state">
      <div className={`empty-state__icon ${colorClass}`}>
        {ICONS[variant] || ICONS.empty}
      </div>
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__text">{description}</p>
      {actionLabel && onAction && (
        <button
          className={`btn ${variant === 'error' ? 'btn--danger' : 'btn--primary'} btn--lg`}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </section>
  );
};

export default EmptyState;
