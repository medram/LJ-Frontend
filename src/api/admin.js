import axiosApi from "./axiosApi"


export async function getCustomers()
{
    console.log("getCustomers")
    const req = await axiosApi.get("/admin/customers")
    return req.data
}
