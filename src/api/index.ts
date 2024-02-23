import { AxiosProgressEvent } from "axios";
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

export function uploadFile(uri: string, file: File, { onUploadProgress }: {
    onUploadProgress: ((progressEvent: AxiosProgressEvent) => void) | undefined
})
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


export function uploadFiles(uri: string, files: any, { onUploadProgress }: {
    onUploadProgress: ((progressEvent: AxiosProgressEvent) => void) | undefined
}) {
    const formData = new FormData()

    files.map((file: any) => {
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

export async function payNow(data: any) {
    const req = await axiosApi.post("/checkout", data)
    return req.data
}

export async function contactUs(data: any)
{
    const req = await axiosApi.post("/contact", data)
    return req.data
}

export async function getpages()
{
    const req = await axiosApi.get("/pages")

    return req.data
}

export async function getPage(slug: string)
{
    const req = await axiosApi.get(`/page/${slug}`)
    return req.data
}

export async function getDemoStatus()
{
    const req = await axiosApi.get("/demo")
    return req.data
}

export async function getLCInfo()
{
    const req = await axiosApi.get("/lc/info")
    return req.data
}
