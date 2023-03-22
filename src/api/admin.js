import axiosApi from "./axiosApi"


export async function getCustomers()
{
    console.log("getCustomers")
    const req = await axiosApi.get("/admin/customers")
    return req.data
}


export async function AddCustomer(values)
{
    const req = await axiosApi.post("/admin/customers/add", values)
    return req.data
}
