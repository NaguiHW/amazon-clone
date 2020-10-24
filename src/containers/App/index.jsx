import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../../components/Header';
import { auth } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Cart from '../Cart';
import Home from '../Home';
import Login from '../Login';
import Payment from '../Payment';

const promise = loadStripe('pk_test_51HfZ99JtSn1vJ3Q4V2IGlKEEtrjdBlB7QwxjkgX3ahJkiI06QHHlCgzlv9MWlJ7ogz8Izy88ccjDwHdAzy6yLFbx00qDOaIAy9');

const App = () => {
  const [{}, dispath] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispath({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispath({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/cart">
            <Header />
            <Cart />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
