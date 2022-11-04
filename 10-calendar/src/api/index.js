import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { VITE_API_URL } = getEnvVariables();
console.log(VITE_API_URL)
//Creating a new instance of Axios

const calendarApi = axios.create({
    baseURL: VITE_API_URL,

})

export default calendarApi;