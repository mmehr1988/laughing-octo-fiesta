import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Nav from './components/Navbar/MainNavBar';

// IMPORTANT Created a separate file to handle the ApolloProvider

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path='/'>
          <SearchBooks />
        </Route>
        <Route exact path='/saved'>
          <SavedBooks />
        </Route>
      </div>
    </Router>
  );
}

export default App;
