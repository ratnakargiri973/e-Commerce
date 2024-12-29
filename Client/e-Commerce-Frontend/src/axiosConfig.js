import axios from 'axios';

const instance = axios.create({
    baseURL: "https://e-commerce-8xmf.onrender.com/api/v1",
    withCredentials: true
});

export default instance;