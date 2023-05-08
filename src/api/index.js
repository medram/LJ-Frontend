import axiosApi from "./axiosApi";


export async function getSettings()
{
    const req = await axiosApi.get("/settings")

    return req.data.settings
}
