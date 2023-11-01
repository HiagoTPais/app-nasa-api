import axios from "axios"
import moment from "moment"

const endpoint = process.env.REACT_APP_NASA_ENDPOINT
const apiKey = process.env.REACT_APP_NASA_API_KEY

axios.interceptors.request.use(
    config => {
        config.params = config.params ? config.params : {}
        const configUrl = config.url
        if (configUrl.includes(endpoint)) {
            config.params["api_key"] = apiKey
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default {
    getApod(data = "") {
        console.log(data);
        if (data === "") {
            return axios.get(`${endpoint}planetary/apod`)
        } else {
            console.log(`${endpoint}planetary/apod?date=${data}`);
            return axios.get(`${endpoint}planetary/apod?date=${data}`)
        }
        
    },
    getNeo() {
        const today = moment().format('YYYY-MM-DD')
        const oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD')
        
        return axios.get(`${endpoint}neo/rest/v1/feed?start_date=${oneWeekAgo}&end_date=${today}`)
    }
}