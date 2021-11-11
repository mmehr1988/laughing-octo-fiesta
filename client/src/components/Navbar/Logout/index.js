import React from 'react';
import Auth from '../../../utils/auth';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';

const LogoutButton = () => {
  return (
    <Nav.Link
      to='/'
      onClick={Auth.logout}
      style={{
        color: 'white',
      }}
    >
      Logout
    </Nav.Link>
  );
};

export default LogoutButton;
