import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

import { searchGoogleBooks } from '../utils/API';

const SearchBooks = (props) => {
  const [state, setState] = useState({
    books: [],
    searchFields: '',
    sort: '',
  });

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!state.searchFields) {
      return false;
    }

    try {
      // Using Axios to get google books
      const getGoogleAPI = await searchGoogleBooks(state.searchFields);

      // console.log(getGoogleAPI);

      // Mapping over the API data to create unique object
      const bookData = getGoogleAPI.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || 'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg',
        link: book.volumeInfo.infoLink,
      }));

      // console.log(bookData);

      //////////////////////////////////////////////////////
      // Setting the state books to hold the 'const = bookData'
      setState({ ...state, books: [...bookData] });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchField = (e) => {
    // console.log(e.target.value);
    // setting the state 'searchFields' to hold the value of input
    setState({ ...state, searchFields: e.target.value });
  };

  // const handleSort = (e) => {};

  return (
    <div>
      <SearchBar handleSearchSubmit={handleSearchSubmit} handleSearchField={handleSearchField} />
      <BookCard booksData={state.books} />
    </div>
  );
};

export default SearchBooks;
