import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  console.log(user);
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    body: user
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  console.log("logout from userService")
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => {
    if(res.ok) return res.json()
    throw new Error('User does not exist') // This is the error in our try catch(err)
  })
}

export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};