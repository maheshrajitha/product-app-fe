import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Category from './pages/Category';
import Products from './pages/Products';

function App() {
  return (
    <BrowserRouter>
      <Route exact path={'/'} component={Login} />
      <Route exact path={'/categories'} component={Category} />
      <Route exact path={'/products'} component={Products}/>
    </BrowserRouter>
  );
}

export default App;
