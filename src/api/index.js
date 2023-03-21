import axiosApi from "./axiosApi";


export async function getSettings()
{
    console.log("getSettings run")
    const req = await axiosApi.get("/settings")

    return req.data.settings
}
