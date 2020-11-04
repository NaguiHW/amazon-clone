import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './index.scss';

const Login = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const signIn = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(state.email, state.password)
      .then(auth => {
        if (auth) {
          history.push('/');
        }
      })
      .catch(error => alert(error.message));
  };

  const register = e => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(state.email, state.password)
      .then(auth => {
        if (auth) {
          history.push('/');
        }
      })
      .catch(error => alert(error.message));
  };

  return !user ? (
    <div className="login">
      <Link to="/">
        <img src="http://ipiccy.com/blog/wp-content/uploads/2016/10/Amazon_logo_plain.svg_.png" alt="Amazon" className="login-logo" />
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form onSubmit={signIn}>
          <label htmlFor="email">
            <h5>E-mail</h5>
            <input type="text" name="email" id="email" onChange={handleChange} />
          </label>
          <label htmlFor="password">
            <h5>Password</h5>
            <input type="password" name="password" id="password" onChange={handleChange} />
          </label>
          <button type="submit" className="login-button">Sign In</button>
        </form>
        <p>By continuing, you agree to Amazon's Fake Clone Conditions of Use and Privacy Notice.</p>
        <button type="button" className="register-button" onClick={register}>Create your Amazon Account</button>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
