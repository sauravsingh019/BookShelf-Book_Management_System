import React from 'react';

const GENRES = [
  'All',
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

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SearchFilter = ({
  search,
  setSearch,
  genre,
  setGenre,
  sortBy,
  setSortBy,
  total,
  filtered,
  onClear,
  hasActiveFilters,
}) => (
  <section className="search-filter" id="search-filter">
    <div className="search-filter__row">
      {/* Search Input */}
      <div className="search-filter__search-wrap">
        <span className="search-filter__search-icon">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search by title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-filter__input"
          aria-label="Search books"
          id="search-input"
        />
        {search && (
          <button
            className="search-filter__clear"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {/* Genre Select */}
      <div className="search-filter__select-wrap">
        <span className="search-filter__select-label">Genre</span>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="search-filter__select"
          aria-label="Filter by genre"
          id="genre-filter"
        >
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Select */}
      <div className="search-filter__select-wrap">
        <span className="search-filter__select-label">Sort</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="search-filter__select"
          aria-label="Sort books"
          id="sort-filter"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A–Z</option>
          <option value="author">Author A–Z</option>
        </select>
      </div>
    </div>

    {/* Footer */}
    <div className="search-filter__footer">
      <p className="search-filter__count">
        Showing <strong>{filtered}</strong> of <strong>{total}</strong> books
      </p>
      {hasActiveFilters && (
        <button className="btn btn--ghost btn--sm" onClick={onClear}>
          Reset All Filters
        </button>
      )}
    </div>
  </section>
);

export default SearchFilter;
