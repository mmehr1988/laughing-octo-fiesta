import React, { useState } from 'react';
import Login from '../LoginForm';
import Signup from '../SignUpForm';

// BOOTSTRAP COMPONENTS
import { Modal, Nav, Tab } from 'react-bootstrap';

const LoginSignUpModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Nav.Link
        onClick={handleShow}
        style={{
          color: 'white',
        }}
      >
        Login/Sign Up
      </Nav.Link>

      {/* LOGIN/SIGNUP MODAL */}
      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Tab.Container id='left-tabs-example' defaultActiveKey='login'>
          {/* LOGIN/SIGNUP MODAL: HEADER */}
          <Modal.Header closeButton>
            <Modal.Title>
              <Nav variant='pills' className='flex-row gap-2'>
                <Nav.Item>
                  <Nav.Link variant='success' type='submit' eventKey='login'>
                    <span className='p-2'>Login</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup' type='submit'>
                    <span className='p-2'>Sign Up</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          {/* LOGIN/SIGNUP MODAL: BODY */}
          <Modal.Body>
            <Tab.Content>
              {/* TAB 1: LOGIN */}
              <Tab.Pane eventKey='login'>
                <Login />
              </Tab.Pane>
              {/* TAB 2: : SIGNUP */}
              <Tab.Pane eventKey='signup'>
                <Signup />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </div>
  );
};

export default LoginSignUpModal;
