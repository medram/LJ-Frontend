import axiosApi from "./axiosApi"


//########################## Customers #############################

export async function getCustomers()
{
    const req = await axiosApi.get("/admin/customers")
    return req.data
}

export async function AddCustomer(values: any)
{
    const req = await axiosApi.post("/admin/customers/add", values)
    return req.data
}

export async function deleteCustomer(id: number)
{
    const req = await axiosApi.post("/admin/customers/delete", { id })
    return req.data
}

export async function customerDetails(id: number)
{
    const req = await axiosApi.get(`/admin/customers/details/${id}`)
    return req.data?.customer
}

export async function updateCustomer(id: number, customer: any)
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


export async function getPages()
{
    const req = await axiosApi.get("/admin/pages")

    return req.data
}

export async function getPage(id: number)
{
    const req = await axiosApi.get("/admin/pages/details/" + id)
    return req.data
}

export async function getDashboardPlans()
{
    const req = await axiosApi.get("/admin/plans")
    return req.data
}

export async function addPage(values: any)
{
    const req = await axiosApi.post("/admin/pages/add", values)
    return req.data
}

export async function editPage(id: number, values: any)
{
    const req = await axiosApi.post("/admin/pages/edit/" + id, values)
    return req.data
}

export async function deletePage(id: number)
{
    const req = await axiosApi.post("/admin/pages/delete", {id})
    return req.data
}

export async function saveDashboardSettings(settings: any)
{
    const req = await axiosApi.post('/admin/settings', settings)
    return req.data
}

export async function addPlan(values: any) {
    const req = await axiosApi.post("/admin/plans/add", values)
    return req.data
}

export async function editPlan(id: number, values: any)
{
    const req = await axiosApi.post("/admin/plans/edit/" + id, values)
    return req.data
}

export async function deletePlan(id: number)
{
    const req = await axiosApi.post("/admin/plans/delete", {id})
    return req.data
}

export async function getSubscriptions()
{
    const req = await axiosApi.get("/admin/subscriptions")
    return req.data
}

export async function cancelSubscription(sub_id: any)
{
    const req = await axiosApi.post(`/admin/subscriptions/${sub_id}/cancel`)
    return req.data
}

export async function sendTestEmail(email: string)
{
    const req = await axiosApi.post(`/admin/send-test-email`, {email})
    return req.data
}

export async function syncWithPayPal(data: any)
{
    const req = await axiosApi.post(`/admin/sync/paypal`, data)
    return req
}

export async function syncWithStripe(data: any)
{
    const req = await axiosApi.post(`/admin/sync/stripe`, data)
    return req
}

export async function getDashboardAnalytics()
{
    const req = await axiosApi.get(`/admin/analytics`)
    return req.data
}

export async function checkLC()
{
    const req = await axiosApi.get(`/lc/check`)
    return req.data
}
