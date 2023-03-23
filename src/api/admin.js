import axiosApi from "./axiosApi"


//########################## Customers #############################

export async function getCustomers()
{
    const req = await axiosApi.get("/admin/customers")
    return req.data
}

export async function AddCustomer(values)
{
    const req = await axiosApi.post("/admin/customers/add", values)
    return req.data
}

export async function deleteCustomer(id)
{
    const req = await axiosApi.post("/admin/customers/delete", { id })
    return req.data
}

export async function customerDetails(id)
{
    const req = await axiosApi.get(`/admin/customers/details/${id}`)
    return req.data?.customer
}

export async function updateCustomer(id, customer)
{
    const req = await axiosApi.post(`/admin/customers/edit/${id}`, customer)
    return req.data
}

//########################## Plans #############################

export async function getPlans()
{
    const req = await axiosApi.get("/admin/plans")
    return req.data
}
