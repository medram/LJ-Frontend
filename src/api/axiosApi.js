import axios from "axios"

const axiosApi = axios.create({
    baseURL: "http://localhost:7000/api/v1",
    //baseURL: "http://192.168.11.104:7000/api/v1",
})

axiosApi.interceptors.request.use(async (config) => {
    let token = null
    try {
        token = JSON.parse(localStorage.getItem("tk"))
    } catch (err) {
        token = ""
    }

    if (token)
        config.headers["Authorization"] = `Bearer ${token}`

    return config
})


// Check if login is required
axiosApi.interceptors.response.use(
    (response) => {
        // Handle a successful response
        return response;
    },
    (error) => {
        // Handle an error response
        if (error.response.status === 401)
        {
            localStorage.removeItem("tk")
            if (window.location.href.includes("/admin") || window.location.href.includes("/account"))
            {
                return window.location.href = `/login?to=${window.location.pathname}`
            }
        }
        return Promise.reject(error);
    }
);

export default axiosApi
