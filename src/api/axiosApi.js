import axios from "axios"

const axiosApi = axios.create({
    baseURL: "http://localhost:7000/api/v1"
})


export default axiosApi
