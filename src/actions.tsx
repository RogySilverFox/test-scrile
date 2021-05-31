import axios from 'axios'


export let getUsersAction = (getUsers: (usersData: any) => void) => {
    return axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        }
    })
    .then(response => {
        getPhotosAction(response.data, getUsers)
        return response.data;
    })
    .catch(error =>{
        console.log(error.response)
        return error.response;
    });
}

let getPhotosAction = (
    userArray: Array<any>, 
    getUsers: (usersData: any) => void
) => {
    return axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/photos',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        }
    })
    .then(response => {
        getUsers({
            usersArray: userArray,
            photosArray: response.data
        });
        return response.data;
    })
    .catch(error =>{
        console.log(error.response)
        return error.response;
    });
}