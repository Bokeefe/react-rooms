import axios from 'axios';

const URL = 'http://localhost:3004';

export function getRooms () {
    const request = axios.get(`${URL}/getRooms`)
        .then(response => response.data)

    return {
        type: 'GET_ROOMS',
        payload: request
    }
}
