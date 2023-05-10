import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"


export default function Dropzone({
    children,
    onUpload,
    onError,
    uploadMessage="Uploading...",
    completedUploadMessage="Uploaded Successfully.",
    showProgressBar=true,
    showProgress=true,
    name=null,
    extraOnUploadProps={},
    dropzoneOptions={}
})
{
    const [isUploading, setIsUploading] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [progress, setProgressValue] = useState(0) // in %
    const [isSuccessUpload, setIsSuccessUpload] = useState(false)

    let maxSize = 1024 * 1024 // in bytes

    const { getRootProps, getInputProps, acceptedFiles, fileRejections, isFocused, isDragAccept, isDragActive } = useDropzone({
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
        maxSize: maxSize, // in bytes
        multiple: false,
        ...dropzoneOptions
    })

    const setProgress = useCallback((value) => {
        value = value > 100 ? 100 : (value < 0 ? 0 : value)
        //if (isUploading)
        setProgressValue(value)
        if (value >= 100)
            setIsCompleted(true)
    }, [isUploading])

    useEffect(useCallback(() => {
        if (typeof onUpload === "function" && acceptedFiles.length)
        {
            setIsUploading(true)
            onUpload({ ...extraOnUploadProps, files: acceptedFiles, setProgress, setIsSuccessUpload, resetDropzone, name })
        }
    }), [acceptedFiles.length])

    useEffect(useCallback(() => {
        if (typeof onError === "function" && fileRejections.length)
        {
            setIsUploading(false)
            onError(fileRejections)
        }
    }), [fileRejections.length])


    const resetDropzone = useCallback(() => {
        setIsCompleted(false)
        setIsUploading(false)
        setProgressValue(0)
        setIsSuccessUpload(false)
    })

    const handleAbort = useCallback((e) => {
        e.preventDefault()
        resetDropzone()
    })

    useEffect(() => {
        if (isCompleted)
        {
            setTimeout(() => {
                resetDropzone()
            }, 5000)
        }
    }, [isCompleted])

    return (
        <>
            {isSuccessUpload ? (
                <div className="dropzone completed">
                    <p>{completedUploadMessage}</p>
                </div>
            ) : (isUploading? (
                    <div className="dropzone focused">
                        <p>{showProgress && `${progress.toFixed(1)}% `}{uploadMessage}</p>
                        <p className="close" onClick={handleAbort}>x</p>
                        {showProgressBar && <div className="progress" style={{ width: `${progress}%`}}></div>}
                    </div>
                ) : (
                    <div {...getRootProps()} className={(isFocused || isDragAccept || isDragActive || isUploading) ? "dropzone focused" : "dropzone"}>
                            {children ? children : (
                                <>
                                    <p>Drag & Drop image (png, jpg, jpeg)</p>
                                    <p>Max size {formatBytes(maxSize)}</p>
                                    <input {...getInputProps()} />
                                </>
                            )}
                    </div>
                )
            )}
        </>
    )
}


function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
