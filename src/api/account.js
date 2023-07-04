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


export async function getUserInvoices() {
    const req = await axiosApi.get("/user/invoices")
    return req.data
}

export async function updateUserPassword(data)
{
    const req = await axiosApi.post("/user/update-password", data)
    return req.data
}

export async function getUserChatRoomList()
{
    const req = await axiosApi.get("/user/chat-list")
    return req.data
}

export async function getChatRoom(uuid)
{
    const req = await axiosApi.get(`/user/chat/${uuid}`)
    return req.data
}

