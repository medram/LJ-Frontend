import axios from "axios"

const axiosApi = axios.create({
    baseURL: "http://localhost:7000/api/v1",
    //baseURL: "http://192.168.11.104:7000/api/v1",
})

axiosApi.interceptors.request.use(async (config) => {
    const token = JSON.parse(localStorage.getItem("tk"))

    if (token)
        config.headers["Authorization"] = `Bearer ${token}`

    return config
})

export default axiosApi
