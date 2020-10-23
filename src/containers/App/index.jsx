import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Cart from '../Cart';
import Home from '../Home';
import Login from '../Login';

const App = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route path="/login">
          <Login />
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

export default App;
