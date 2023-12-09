import axios from "axios"

// local URL
axios.defaults.baseURL = 'https://full-stack-django-0f48f57393c6.herokuapp.com/' 

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'true'
axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*'

axios.defaults.headers.withCredentials = true

// response.setHeader("Access-Control-Allow-Credentials", "true");
// response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
// response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

// define interceptor Request and Response
export const axiosReq = axios.create();
export const axiosRes = axios.create();
