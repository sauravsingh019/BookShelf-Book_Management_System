import React from 'react';

/**
 * Maps a genre string to a CSS modifier class for color-coding genre pills.
 */
const getGenreClass = (genre) => {
  if (!genre) return 'book-card__genre--default';
  const slug = genre.toLowerCase().replace(/\s+/g, '-');
  const known = [
    'fiction','non-fiction','science-fiction','mystery',
    'biography','history','fantasy','romance','thriller','self-help',
  ];
  return known.includes(slug)
    ? `book-card__genre--${slug}`
    : 'book-card__genre--default';
};

/**
 * Picks a deterministic cover gradient from the book title.
 */
const COVER_GRADIENTS = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  'linear-gradient(135deg, #10b981, #047857)',
  'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  'linear-gradient(135deg, #ec4899, #be185d)',
  'linear-gradient(135deg, #f97316, #c2410c)',
  'linear-gradient(135deg, #06b6d4, #0e7490)',
  'linear-gradient(135deg, #6366f1, #4338ca)',
];

const getCoverGradient = (book) => {
  if (book.coverColor) {
    // Use the stored accent color and create a gradient
    return `linear-gradient(135deg, ${book.coverColor}, ${book.coverColor}dd)`;
  }
  const hash = (book.title || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return COVER_GRADIENTS[hash % COVER_GRADIENTS.length];
};

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const BookCard = ({ book, onEdit, onDelete, style }) => {
  const initials = (book.title || 'B')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');

  return (
    <article className="book-card" style={style}>
      {/* Cover */}
      <div
        className="book-card__cover"
        style={{ background: getCoverGradient(book) }}
      >
        <div className="book-card__cover-pattern" />
        <div className="book-card__cover-gradient" />
        <span className="book-card__initials">{initials}</span>
        <span className="book-card__year">{book.year || 'N/A'}</span>
      </div>

      {/* Body */}
      <div className="book-card__body">
        <div className="book-card__meta">
          <span className={`book-card__genre ${getGenreClass(book.genre)}`}>
            {book.genre || 'General'}
          </span>
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">
            by <strong>{book.author}</strong>
          </p>
          <p className="book-card__desc">
            {book.description?.trim() || 'No description provided for this book yet.'}
          </p>
        </div>

        {/* Actions */}
        <div className="book-card__actions">
          <button
            className="book-card__btn book-card__btn--edit"
            onClick={() => onEdit(book)}
            aria-label={`Edit ${book.title}`}
          >
            <EditIcon />
            Edit
          </button>
          <button
            className="book-card__btn book-card__btn--delete"
            onClick={() => onDelete(book)}
            aria-label={`Delete ${book.title}`}
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
