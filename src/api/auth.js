import axiosApi from "./axiosApi";


export async function auth(email, password)
{
    const req = await axiosApi.post("/auth", {
        email,
        password
    })
    return req.data
}

export async function logout()
{
    const req = await axiosApi.post("/auth/logout")
    return req.data
}

export default function register(user)
{
    return axiosApi.post("/auth/register", user)
}

export async function currentUser()
{
    const req = await axiosApi.post("/auth/user")
    return req.data
}
