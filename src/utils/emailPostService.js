import tokenService from './tokenService';

const BASE_URL = '/api/email/'



export function getEmailAuth() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => res.json());
  }