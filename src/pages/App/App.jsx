import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService'
import AdminSignupPage from '../AdminSignupPage/AdminSignupPage';

function App() {
  // getUser decodes the JWT token into a javascript object
  // this corresponds to the JWT payload defined in the server
  // signup or login function-- const token = createJWT(user) -- where user is the document created from mongo
  const [user, setUser] = useState(userService.getUser())

// get the user from localstorage and decode the token
  function handleSignUpOrLogin(){
    setUser(userService.getUser()) 
  }

  function handleLogout(){
    userService.logout();
    setUser({user: null});
  }
  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
              <h1>{user.isAdmin ? "Admin Home" : "Home Page"}</h1>
          </Route>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup">
             <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/admin">
             <AdminSignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
      </Switch>
    </div>
  );
}

export default App;