import axiosApi from "./axiosApi"


export async function updateAccountDetails(data)
{
    const req = await axiosApi.post("/user/profile", data)
    return req.data
}


export async function currentSubscription()
{
    const req = await axiosApi.get("/user/subscription")
    return req.data
}
