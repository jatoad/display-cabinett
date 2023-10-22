import axios from "axios"

// local URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/' 

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'true'
// axios.defaults.headers['Access-Control-Allow-Headers'] = '*'
axios.defaults.withCredentials = true
