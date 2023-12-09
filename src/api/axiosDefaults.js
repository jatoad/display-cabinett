import axios from "axios"

// local URL
axios.defaults.baseURL = 'https://full-stack-django-0f48f57393c6.herokuapp.com/' 

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'true'
axios.defaults.headers['Access-Control-Allow-Headers'] = '*'
axios.defaults.withCredentials = true

// define interceptor Request and Response
export const axiosReq = axios.create();
export const axiosRes = axios.create();
