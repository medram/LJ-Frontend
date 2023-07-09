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

export async function sendPrompt(uuid, prompt)
{
    const req = await axiosApi.post(`/user/chat/${uuid}`, {prompt}, {
        timeout: 300000 // 5 minutes
    })
    return req.data
}

export async function stopPrompt(uuid)
{
    const req = await axiosApi.post(`/user/chat/${uuid}/stop`)

    return req
}

export async function clearChatHistory(uuid)
{
    const req = await axiosApi.post(`/user/chat/${uuid}/clear-history`)

    return req
}

export async function deleteChatRoom(uuid)
{
    const req = await axiosApi.delete(`/user/chat/${uuid}/delete`)

    return req
}
