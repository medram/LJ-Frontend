import axiosApi from "./axiosApi";


export async function getSettings()
{
    const req = await axiosApi.get("/settings")

    return req.data
}

export async function getDashboardSettings()
{
    const req = await axiosApi.get("/admin/settings")
    return req.data
}

export function uploadFile(uri, file, { onUploadProgress })
{
    const formData = new FormData()

    formData.append('file', file)

    return axiosApi.post(uri, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    })
}


export function uploadFiles(uri, files, { onUploadProgress }) {
    const formData = new FormData()

    files.map(file => {
        formData.append('file[]', file)
    })

    return axiosApi.post(uri, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    })
}

export async function getPlans()
{
    const req = await axiosApi.get("/plans")
    return req.data
}

export async function getAvailablePaymentMethods()
{
    const req = await axiosApi.get("/payment-methods")
    return req.data
}
