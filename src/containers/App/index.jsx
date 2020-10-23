import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../../components/Header';
import { auth } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Cart from '../Cart';
import Home from '../Home';
import Login from '../Login';
import Payment from '../Payment';

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
            <Payment />
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
