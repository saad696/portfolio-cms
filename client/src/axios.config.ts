import axios from 'axios';

const customAxios = axios.create({
    baseURL: `http://localhost:5000/admin-cms`,
});

const requestHandler = (request: any) => {
    // Token will be dynamic so we can use any app-specific way to always
    // fetch the new token before making the call
    request.headers.Authorization = '4990914480';
    return request;
};

const errorHandler = (error: any) => {
    return Promise.reject(error.response.data.message);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => response,
    (error) => errorHandler(error)
);

export default customAxios;
