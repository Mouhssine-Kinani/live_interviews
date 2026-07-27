import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // browser will send cookies to the server in every request ( on every single request ), and the server can send cookies back to the browser
});

export default axiosInstance;