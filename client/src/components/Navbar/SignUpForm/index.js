import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

import { Form, Button } from 'react-bootstrap';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // UPDATING "formState" BASED ON INPUT CHANGES
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // ON FORM SUBMIT
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);

    try {
      // [1] useMutation[ADD_USER] to add a new user to the database
      const { data } = await addUser({
        variables: { ...formState },
      });

      // [2] THEN, CHECK IF THE TOKEN IS VALID & NOT EXPIRED
      // SEE FOLDER UTILS -> AUTH
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    // [3] THEN, CLEAR THE SIGNUP FORM
    setFormState({
      username: '',
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
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control type='username' placeholder='Your username' name='username' value={formState.username} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control type='email' placeholder='Your email address' name='email' value={formState.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control type='password' placeholder='Your password' name='password' value={formState.password} onChange={handleChange} required />
          </Form.Group>
          <Button type='submit' variant='success'>
            Submit
          </Button>
        </Form>
      )}
      {error && <div className='my-3 p-3 bg-danger text-white'>{error.message}</div>}
    </div>
  );
};

export default Signup;
