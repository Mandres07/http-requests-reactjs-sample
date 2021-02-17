import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

instance.interceptors.request.use(request => {
   return request;
}, error => {
   return Promise.reject(error);
});

export default instance;
