import React from 'react';
import { Link } from 'react-router-dom';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';

const SavedBooks = () => {
  return (
    <Nav.Link
      as={Link}
      to='/saved'
      style={{
        color: 'white',
      }}
    >
      Saved Books
    </Nav.Link>
  );
};

export default SavedBooks;
