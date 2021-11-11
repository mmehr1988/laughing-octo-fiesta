import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

import { Form, Button } from 'react-bootstrap';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      {data ? (
        <Link to='/'></Link>
      ) : (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter email' name='email' value={formState.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' name='password' value={formState.password} onChange={handleChange} required />
          </Form.Group>
          <Button variant='success' type='submit'>
            Login
          </Button>
        </Form>
      )}
      {error && <div className='my-3 p-3 bg-danger text-white'>{error.message}</div>}
    </div>
  );
};

export default Login;
