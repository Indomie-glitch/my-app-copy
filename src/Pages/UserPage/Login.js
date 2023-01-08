import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuthentication from './auth.hook';
import './Login.css';
import { AiFillGoogleCircle } from 'react-icons/ai';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleLogin } = useAuthentication();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setCredentialToLocalStorage = id => {
    localStorage.setItem('userId', id);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      console.log('run?');
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert varient="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {' '}
              Log In
            </Button>

            <div
              className="button-login-google"
              type="button"
              onClick={googleLogin}>
              <AiFillGoogleCircle />
              <button type="button">Sign In With Google</button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signin"> Sign Up</Link>
      </div>
    </>
  );
}
