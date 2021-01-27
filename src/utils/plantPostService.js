import tokenService from './tokenService';

const BASE_URL = '/api/plantswap/'


export function create(post){
    return fetch(BASE_URL, {
        method: 'POST',
        body: post, // our info from the form
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())

}

export function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => res.json());
  }

// export function getOne(plantId){
//     console.log(BASE_URL + plantId, "utils<---------------------------");
//     return fetch(BASE_URL + plantId, {
//         headers: {
//             'Authorization': 'Bearer ' + tokenService.getToken()
//         }
//     }).then(res => {
//         console.log("second part of getOne")
//         if(res.ok) return res.json()
//         throw new Error('Plant posting does not exist')
//     })
// }

export function getOne(plantId) {
    return fetch(BASE_URL + plantId, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => res.json());
  }


  export function searchTrefle(searchTerm) {
      return fetch(BASE_URL + "api/" + searchTerm, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
      })
      .then(res => res.json());
  }

  export function removePost(id){
    return fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json());
}