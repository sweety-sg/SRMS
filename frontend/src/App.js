import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import React from 'react';
import MyAppBar from './components/Myappbar';
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard';
import Page404 from './pages/error';
// function loggedIn() {
//   return false
// }
// function requireAuth(nextState, replace) {
//   if (!loggedIn()) {
//     replace({
//       pathname: '/'
//     })
//   }
// }
function App() {

  return (
    <>
    <div>
    <Route exact path="/dashboard">
      
        <Dashboard />
      </Route>
      <Route exact path="/">
        <LoginPage/>
      </Route>
      <Route exact path="/404">
        <Page404/>
      </Route>
    </div>
    </>
  );
}

export default App;