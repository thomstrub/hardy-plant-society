import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService'
import AdminSignupPage from '../AdminSignupPage/AdminSignupPage';
import PlantPostCreatePage from '../PlantPostCreatePage/PlantPostCreatePage';
import PlantFeedPage from '../PlantFeedPage/PlantFeedPage';
import PlantDetailPage from '../PlantDetailPage/PlantDetailPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import AdminPostCreatePage from '../AdminPostCreatePage/AdminPostCreatePage'
import HomePage from '../HomePage/HomePage'

function App() {
  // getUser decodes the JWT token into a javascript object
  // this corresponds to the JWT payload defined in the server
  // signup or login function-- const token = createJWT(user) -- where user is the document created from mongo
  const [user, setUser] = useState(userService.getUser())
  const [isAdminPost, setIsAdminPost] = useState(false)


// get the user from localstorage and decode the token
  function handleSignUpOrLogin(){
    setUser(userService.getUser()) 
  }

  function handleLogout(){
    userService.logout();
    setUser({user: null});
  }
  
   

  const [loading, setLoading] = useState(false);
  
  


  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
              <HomePage user={user} isAdminPost={isAdminPost} setIsAdminPost={setIsAdminPost}/>
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
          <Route exact path="/admin/posts/new">
              {userService.getUser()?
                <AdminPostCreatePage user={user} loading={loading} setLoading={setLoading} handleLogout={handleLogout}/>
              :
                <Redirect to='/login'/>
              }
                  
          </Route>
          <Route exact path="/plantswap/">
              <PlantFeedPage user={user} handleLogout={handleLogout}/>
          </Route>
          <Route exact path="/plantswap/new">
              {userService.getUser()?
                <PlantPostCreatePage user={user} setLoading={setLoading} loading={loading} handleLogout={handleLogout}/>
              :
                <Redirect to='/login'/>
              }
                  
          </Route>
          <Route path="/plantswap/:id">
                  <PlantDetailPage user={user} handleLogout={handleLogout}/>
          </Route>
                
          <Route path="/:username">
            
            {userService.getUser()?
              <ProfilePage user={user} handleLogout={handleLogout} isAdminPost={isAdminPost} setIsAdminPost={setIsAdminPost}/>
              :
                <Redirect to='/login'/>
              }
          </Route>   
                
                
        
         
      </Switch>
    </div>
  );
}

export default App;