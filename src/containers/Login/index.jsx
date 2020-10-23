import { Link } from '@material-ui/core';
import React from 'react';
import './index.scss';

const Login = () => (
  <div className="login">
    <Link to="/">
      <img src="http://ipiccy.com/blog/wp-content/uploads/2016/10/Amazon_logo_plain.svg_.png" alt="Amazon" className="login-logo" />
    </Link>
    <div className="login-container">
      <h1>Sign in</h1>
      <form>
        <label htmlFor="email">
          <h5>E-mail</h5>
          <input type="text" name="email" id="email" />
        </label>
        <label htmlFor="password">
          <h5>Password</h5>
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit" className="login-button">Sign In</button>
      </form>
      <p>By continuing, you agree to Amazon's Fake Clone Conditions of Use and Privacy Notice.</p>
      <button type="button" className="register-button">Create your Amazon Account</button>
    </div>
  </div>
);

export default Login;
