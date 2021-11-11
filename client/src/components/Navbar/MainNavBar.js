import React from 'react';
import Auth from '../../utils/auth';
// NAV Links
import LoginSignUp from './LoginSignUpModal';
import Logout from './Logout';
import SavedBooks from './SavedBooks';

// Bootstrap Navbar
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const MainNavBar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand='lg'
        className='m-2 rounded'
        variant='dark'
        style={{
          backgroundImage: `url("https://source.unsplash.com/itA0ybdIDTs")`,
        }}
      >
        <Container>
          <Navbar.Brand href='/'>Google Books Search</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='justify-content-end' style={{ width: '100%' }}>
              {/* AUTHROIZATION -------------------------------------- */}
              {Auth.loggedIn() ? (
                <React.Fragment>
                  <SavedBooks />
                  <Logout />
                </React.Fragment>
              ) : (
                <LoginSignUp />
              )}
              {/* AUTHROIZATION -------------------------------------- */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavBar;
