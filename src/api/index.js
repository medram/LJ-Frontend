import axiosApi from "./axiosApi";


export async function getSettings()
{
    const req = await axiosApi.get("/settings")

    return req.data.settings
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
