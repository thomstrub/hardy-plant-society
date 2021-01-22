import tokenService from './tokenService';

const BASE_URL = '/api/plantswap/'




function create(post){
    return fetch(BASE_URL, {
        method: 'POST',
        body: post, // our info from the form
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())

}

function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => res.json());
  }

function getOne(plantId){
    return fetch(BASE_URL + plantId, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        throw new Error('Plant posting does not exist')
    })
}

export default {
    create,
    getAll,
    getOne
    
};