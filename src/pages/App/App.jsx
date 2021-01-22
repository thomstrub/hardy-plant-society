import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as plantPostAPI from '../../utils/plantPostService'
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService'
import AdminSignupPage from '../AdminSignupPage/AdminSignupPage';
import PlantPostCreatePage from '../PlantPostCreatePage/PlantPostCreatePage';
import PlantFeedPage from '../PlantFeedPage/PlantFeedPage';
import PlantDetailPage from '../PlantDetailPage/PlantDetailPage'

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

  
  const [loading, setLoading] = useState(false);
  
  async function handleAddPost(post){
      setLoading(true);
      const data = await plantPostAPI.create(post);

      // to check to make sure this is working
      console.log(data, ' data')
      // data is the response from our create function in controllers/posts
      // update the state
      setLoading(false);
      // setPosts([data.post,  ...posts])
      // to conifrm this check the devtools for your feed component
      
  }


  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
              <h1>Home Page</h1>
          </Route>
          <Route exact path="/plantswap/new">
             <PlantPostCreatePage user={user} handleAddPost={handleAddPost} loading={loading}/>
          </Route>
          <Route exact path="/plantswap/">
             <PlantFeedPage user={user} handleLogout={handleLogout}/>
          </Route>
          <Route path="/plantswap/:id">
             <PlantDetailPage user={user} handleLogout={handleLogout}/>
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