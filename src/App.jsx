import React, { startTransition, useDeferredValue, useMemo, useState } from 'react';
import { useBooks } from './hooks/useBooks';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import SearchFilter from './components/SearchFilter';
import Toast from './components/Toast';
import SkeletonGrid from './components/Skeleton';
import EmptyState from './components/EmptyState';
import ConfirmDialog from './components/ConfirmDialog';

/* ── SVG Icons ──────────────────────────────────────────────────────────── */
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ── App Component ──────────────────────────────────────────────────────── */
const App = () => {
  const {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    refetch,
  } = useBooks();

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deferredSearch = useDeferredValue(search);

  /* ── Filtered & Sorted Books ──────────────────────────────────────────── */
  const filteredBooks = useMemo(() => {
    let result = [...books];
    const query = deferredSearch.trim().toLowerCase();

    if (query) {
      result = result.filter((book) =>
        [book.title, book.author].some((val) =>
          val?.toLowerCase().includes(query)
        )
      );
    }

    if (genre !== 'All') {
      result = result.filter((book) => book.genre === genre);
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') return (b.year || 0) - (a.year || 0);
      if (sortBy === 'oldest') return (a.year || 0) - (b.year || 0);
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'author') return (a.author || '').localeCompare(b.author || '');
      return 0;
    });

    return result;
  }, [books, deferredSearch, genre, sortBy]);

  /* ── Stats ────────────────────────────────────────────────────────────── */
  const stats = useMemo(() => {
    const genres = new Set(books.map((b) => b.genre).filter(Boolean));
    const years = books.map((b) => Number(b.year)).filter(Boolean);

    return {
      total: books.length,
      visible: filteredBooks.length,
      genres: genres.size,
      latestYear: years.length ? Math.max(...years) : '—',
    };
  }, [books, filteredBooks.length]);

  /* ── Form Handlers ────────────────────────────────────────────────────── */
  const openCreateForm = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const openEditForm = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingBook(null);
    setShowForm(false);
  };

  const handleSubmit = async (data) => {
    setFormLoading(true);

    try {
      if (editingBook) {
        await updateBook(editingBook.id, data);
        setToast({
          type: 'success',
          message: `"${data.title}" was updated successfully.`,
        });
      } else {
        await addBook(data);
        setToast({
          type: 'success',
          message: `"${data.title}" was added to your library.`,
        });
      }
      closeForm();
    } catch (submitError) {
      setToast({
        type: 'error',
        message: submitError.message || 'Something went wrong while saving the book.',
      });
    } finally {
      setFormLoading(false);
    }
  };

  /* ── Delete Handlers ──────────────────────────────────────────────────── */
  const requestDelete = (book) => {
    setDeleteTarget(book);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);

    try {
      await deleteBook(deleteTarget.id);
      setToast({
        type: 'info',
        message: `"${deleteTarget.title}" was removed from the library.`,
      });
    } catch (delError) {
      setToast({
        type: 'error',
        message: delError.message || 'Unable to delete the book right now.',
      });
    } finally {
      setDeleteLoading(false);
      setDeleteTarget(null);
    }
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  /* ── Search & Filter Handlers ─────────────────────────────────────────── */
  const handleSearchChange = (value) => {
    startTransition(() => {
      setSearch(value);
    });
  };

  const clearFilters = () => {
    setSearch('');
    setGenre('All');
    setSortBy('newest');
  };

  const hasActiveFilters = search.trim() || genre !== 'All' || sortBy !== 'newest';

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <div className="app">
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <header className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              React CRUD Assignment
            </div>
            <h1 className="hero__title">Book Management System</h1>
            <p className="hero__subtitle">
              Manage your collection with a clean CRUD workflow, instant search,
              genre filters, and responsive cards — all powered by MockAPI.
            </p>
          </div>
          <div className="hero__actions">
            <button className="btn btn--primary btn--lg" onClick={openCreateForm} id="add-book-btn">
              <PlusIcon />
              Add New Book
            </button>
            <button className="btn btn--secondary btn--lg" onClick={refetch} id="refresh-btn">
              <RefreshIcon />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content ──────────────────────────────────────────────── */}
      <main className="main">
        {/* Stats Grid */}
        <section className="stats-grid" aria-label="Library statistics">
          <article className="stat-card">
            <div className="stat-card__icon stat-card__icon--amber">
              <BookIcon />
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">Total Books</span>
              <strong className="stat-card__value">{stats.total}</strong>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-card__icon stat-card__icon--blue">
              <EyeIcon />
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">Visible</span>
              <strong className="stat-card__value">{stats.visible}</strong>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-card__icon stat-card__icon--purple">
              <LayersIcon />
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">Genres</span>
              <strong className="stat-card__value">{stats.genres}</strong>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-card__icon stat-card__icon--emerald">
              <CalendarIcon />
            </div>
            <div className="stat-card__info">
              <span className="stat-card__label">Latest Year</span>
              <strong className="stat-card__value">{stats.latestYear}</strong>
            </div>
          </article>
        </section>

        {/* Search & Filters */}
        <SearchFilter
          search={search}
          setSearch={handleSearchChange}
          genre={genre}
          setGenre={setGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          total={books.length}
          filtered={filteredBooks.length}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Loading State */}
        {loading && <SkeletonGrid count={6} />}

        {/* Error State */}
        {!loading && error && (
          <EmptyState
            variant="error"
            title="Unable to load books"
            description={error}
            actionLabel="Try Again"
            onAction={refetch}
          />
        )}

        {/* Empty Library */}
        {!loading && !error && books.length === 0 && (
          <EmptyState
            variant="empty"
            title="Your shelf is empty"
            description="Add your first book to start building your collection and verify the create flow."
            actionLabel="Create First Book"
            onAction={openCreateForm}
          />
        )}

        {/* No Search Results */}
        {!loading && !error && books.length > 0 && filteredBooks.length === 0 && (
          <EmptyState
            variant="search"
            title="No books match your filters"
            description="Try a different keyword, switch the genre, or reset the filters to see all books."
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        )}

        {/* Book Grid */}
        {!loading && !error && filteredBooks.length > 0 && (
          <section className="book-grid" aria-label="Book collection">
            {filteredBooks.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={openEditForm}
                onDelete={requestDelete}
                style={{ animationDelay: `${Math.min(index * 0.06, 0.6)}s` }}
              />
            ))}
          </section>
        )}
      </main>

      {/* ─── Footer ────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer__inner">
          <p className="footer__brand">
            Book<span>Shelf</span>
          </p>
          <p className="footer__text">
            Built with React 18 · CRUD Assignment Submission
          </p>
          <div className="footer__tech">
            <span className="footer__tech-badge">React 18</span>
            <span className="footer__tech-badge">Axios</span>
            <span className="footer__tech-badge">MockAPI</span>
          </div>
        </div>
      </footer>

      {/* ─── Modals & Overlays ─────────────────────────────────────────── */}
      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          loading={formLoading}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title={`Delete "${deleteTarget.title}"?`}
          message="This book will be permanently removed from the library. This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          loading={deleteLoading}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;
