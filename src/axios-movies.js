import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://cinemagic99-default-rtdb.firebaseio.com'
})

export default instance