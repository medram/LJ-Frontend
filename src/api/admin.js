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


export async function getPages()
{
    const req = await axiosApi.get("/admin/pages")

    return req.data
}

export async function getPage(id) {
    const req = await axiosApi.get("/admin/pages/details/" + id)
    return req.data
}

export async function getDashboardPlans()
{
    const req = await axiosApi.get("/admin/plans")
    return req.data
}

export async function addPage(values) {
    const req = await axiosApi.post("/admin/pages/add", values)
    return req.data
}

export async function editPage(id, values) {
    const req = await axiosApi.post("/admin/pages/edit/" + id, values)
    return req.data
}

export async function deletePage(id) {
    const req = await axiosApi.post("/admin/pages/delete", {id})
    return req.data
}

export async function saveDashboardSettings(settings)
{
    const req = await axiosApi.post('/admin/settings', settings)
    return req.data
}

export async function addPlan(values) {
    const req = await axiosApi.post("/admin/plans/add", values)
    return req.data
}

export async function editPlan(id, values) {
    const req = await axiosApi.post("/admin/plans/edit/" + id, values)
    return req.data
}

export async function deletePlan(id) {
    const req = await axiosApi.post("/admin/plans/delete", {id})
    return req.data
}

export async function getSubscriptions()
{
    const req = await axiosApi.get("/admin/subscriptions")
    return req.data
}

export async function cancelSubscription(sub_id)
{
    const req = await axiosApi.post(`/admin/subscriptions/${sub_id}/cancel`)
    return req.data
}

export async function sendTestEmail(email)
{
    const req = await axiosApi.post(`/admin/send-test-email`, {email})
    return req.data
}

export async function registerPayPalWebhook() {
    const req = await axiosApi.post(`/admin/register-paypal-webhook`)
    return req
}

export async function getDashboardAnalytics() {
    const req = await axiosApi.get(`/admin/analytics`)
    return req.data
}

export async function checkLC() {
    const req = await axiosApi.get(`/lc/check`)
    return req.data
}
