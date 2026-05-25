import { useCallback, useEffect, useState } from 'react';
import { booksApi } from '../utils/api';

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message ||
  error?.message ||
  fallbackMessage;

const normalizeBook = (book) => ({
  ...book,
  year: Number(book.year) || '',
});

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await booksApi.getAll();
      const nextBooks = Array.isArray(response.data)
        ? response.data.map(normalizeBook)
        : [];

      setBooks(nextBooks);
    } catch (fetchError) {
      setError(
        getErrorMessage(
          fetchError,
          'Unable to load books. Please check the API configuration and try again.'
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (bookData) => {
    try {
      const response = await booksApi.create(bookData);
      const createdBook = normalizeBook(response.data);
      setBooks((currentBooks) => [...currentBooks, createdBook]);
      return createdBook;
    } catch (createError) {
      throw new Error(
        getErrorMessage(createError, 'Unable to add the new book.')
      );
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      const response = await booksApi.update(id, bookData);
      const updatedBook = normalizeBook(response.data);

      setBooks((currentBooks) =>
        currentBooks.map((book) => (book.id === id ? updatedBook : book))
      );

      return updatedBook;
    } catch (updateError) {
      throw new Error(
        getErrorMessage(updateError, 'Unable to update this book.')
      );
    }
  };

  const deleteBook = async (id) => {
    try {
      await booksApi.delete(id);
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));
    } catch (deleteError) {
      throw new Error(
        getErrorMessage(deleteError, 'Unable to delete this book.')
      );
    }
  };

  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    refetch: fetchBooks,
  };
};
