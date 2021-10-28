import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import React from 'react';
import MyAppBar from './components/Myappbar';
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
    <Route exact path="/sample">
        <MyAppBar title = "Dashboard" />
      </Route>
    </div>
    </>
  );
}

export default App;
