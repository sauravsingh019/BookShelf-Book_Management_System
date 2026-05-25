import React, { useEffect, useState } from 'react';

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Mystery',
  'Biography',
  'History',
  'Fantasy',
  'Romance',
  'Thriller',
  'Self-Help',
];

const COLORS = [
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f97316',
  '#06b6d4',
  '#6366f1',
];

const INITIAL_FORM = {
  title: '',
  author: '',
  genre: '',
  year: '',
  description: '',
  coverColor: COLORS[0],
};

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BookForm = ({ book, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!book) {
      setForm(INITIAL_FORM);
      setErrors({});
      return;
    }

    setForm({
      title: book.title || '',
      author: book.author || '',
      genre: book.genre || '',
      year: String(book.year || ''),
      description: book.description || '',
      coverColor: book.coverColor || COLORS[0],
    });
    setErrors({});
  }, [book]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const validate = () => {
    const nextErrors = {};
    const currentYear = new Date().getFullYear();

    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.author.trim()) nextErrors.author = 'Author is required.';
    if (!form.genre) nextErrors.genre = 'Please select a genre.';

    const parsedYear = Number(form.year);
    if (!form.year) {
      nextErrors.year = 'Publication year is required.';
    } else if (
      Number.isNaN(parsedYear) ||
      parsedYear < 1000 ||
      parsedYear > currentYear
    ) {
      nextErrors.year = `Enter a year between 1000 and ${currentYear}.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    await onSubmit({
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      description: form.description.trim(),
      year: Number(form.year),
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="form-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="modal__header">
          <div>
            <p className="modal__eyebrow">
              {book ? 'Update Entry' : 'New Entry'}
            </p>
            <h2 className="modal__title" id="form-title">
              {book ? 'Edit Book Details' : 'Add a New Book'}
            </h2>
          </div>
          <button
            className="modal__close"
            onClick={onCancel}
            aria-label="Close form"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form">
          <div className="form__grid">
            {/* Title */}
            <div className="form__field">
              <label className="form__label" htmlFor="book-title">
                Book Title
              </label>
              <input
                id="book-title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Atomic Habits"
                className={`form__input ${errors.title ? 'form__input--error' : ''}`}
              />
              {errors.title && (
                <span className="form__error">{errors.title}</span>
              )}
            </div>

            {/* Author */}
            <div className="form__field">
              <label className="form__label" htmlFor="book-author">
                Author
              </label>
              <input
                id="book-author"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="e.g. James Clear"
                className={`form__input ${errors.author ? 'form__input--error' : ''}`}
              />
              {errors.author && (
                <span className="form__error">{errors.author}</span>
              )}
            </div>

            {/* Genre */}
            <div className="form__field">
              <label className="form__label" htmlFor="book-genre">
                Genre
              </label>
              <select
                id="book-genre"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className={`form__input ${errors.genre ? 'form__input--error' : ''}`}
              >
                <option value="">Select a genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <span className="form__error">{errors.genre}</span>
              )}
            </div>

            {/* Year */}
            <div className="form__field">
              <label className="form__label" htmlFor="book-year">
                Publication Year
              </label>
              <input
                id="book-year"
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder={String(new Date().getFullYear())}
                className={`form__input ${errors.year ? 'form__input--error' : ''}`}
              />
              {errors.year && (
                <span className="form__error">{errors.year}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form__field">
            <label className="form__label" htmlFor="book-desc">
              Description
            </label>
            <textarea
              id="book-desc"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Add a short summary or note about this book."
              className="form__input form__textarea"
            />
          </div>

          {/* Color Swatches */}
          <div className="form__field">
            <span className="form__label">Cover Accent</span>
            <div className="form__swatch-row">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, coverColor: color }))
                  }
                  className={`form__swatch ${
                    form.coverColor === color ? 'form__swatch--active' : ''
                  }`}
                  style={{ background: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="form__actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary"
            >
              {loading ? 'Saving…' : book ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
