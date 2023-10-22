import axios from "axios"

// local URL
axios.defaults.baseURL = 'https://humble-capybara-rq95vj5r6x63497-8000.app.github.dev/' 

// Remote URL
//axios.defaults.baseURL = 'Heroku or Github URL' 

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true