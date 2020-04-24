import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import './App.css';
import Dashboard from './containers/dashboard/dashboard';
import Customers from './containers/customers/customers';

function App () {
  return (
    <BrowserRouter>
      <div>
        <header className='header'>
          <label className='header-logo'>T CUSTOMER SUPPORT</label>
          <nav>
            <NavLink exact to="/">Dashboard</NavLink>
            <NavLink to="/customers">Customers</NavLink>
          </nav>
        </header>
        <div className='content'>
          <Switch>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
