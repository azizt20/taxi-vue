import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

// const token = localStorage.getItem('token');

export default axios.create({
    baseURL: API_URL,
    // timeout: 1000,
    // headers: {
    //     Authorization: `Token ${token}`,
    // },
});