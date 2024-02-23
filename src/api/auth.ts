import axiosApi from "./axiosApi";


export async function auth(email: string, password: string)
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

export default function register(user: unknown)
{
    return axiosApi.post("/auth/register", user)
}

export async function currentUser()
{
    const req = await axiosApi.post("/auth/user")
    return req.data
}

export async function sendPasswordResetEmail(email: string)
{
    const req = await axiosApi.post("/auth/forget-password", { email })
    return req.data
}

export async function sendResetPassword(payload: any)
{
    const req = await axiosApi.post("/auth/reset-password", payload)
    return req.data
}
