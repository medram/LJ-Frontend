import { ReactNode, useCallback, useEffect, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"


export type onUploadProps = {
    files?: File[]
    setProgress: (progress: number) => void
    setIsSuccessUpload: React.Dispatch<React.SetStateAction<boolean>>
    resetDropzone: () => void
    name?: string,
    [extraOnUploadProps: string]: unknown
}

type DropzoneProps = {
    children: ReactNode,
    onUpload: (options: onUploadProps) => void,
    onError: (rejectedFiles: FileRejection[]) => void,
    uploadMessage?: string,
    completedUploadMessage?: string,
    showProgressBar?: boolean,
    showProgress?: boolean,
    name?: string,
    extraOnUploadProps: object,
    dropzoneOptions: object
}

export default function Dropzone({
    children,
    onUpload,
    onError,
    uploadMessage="Uploading...",
    completedUploadMessage="Uploaded Successfully.",
    showProgressBar=true,
    showProgress=true,
    name="",
    extraOnUploadProps={},
    dropzoneOptions={}
}: DropzoneProps)
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

    const setProgress = useCallback((value: number) => {
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
    }, [acceptedFiles.length]), [acceptedFiles.length])

    useEffect(useCallback(() => {
        if (typeof onError === "function" && fileRejections.length)
        {
            setIsUploading(false)
            onError(fileRejections)
        }
    }, [fileRejections.length]), [fileRejections.length])


    const resetDropzone = useCallback(() => {
        setIsCompleted(false)
        setIsUploading(false)
        setProgressValue(0)
        setIsSuccessUpload(false)
    }, [])

    const handleAbort = useCallback((e: any) => {
        resetDropzone()
    }, [])

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
                    <div {...getRootProps({
                        className: (isFocused || isDragAccept || isDragActive || isUploading) ? "dropzone focused" : "dropzone"
                    })} >
                            <input {...getInputProps()} />
                            {children ? children : (
                                <>
                                    <p>Drag & Drop image (png, jpg, jpeg)</p>
                                    <p>Max size {formatBytes(maxSize)}</p>
                                </>
                            )}
                    </div>
                )
            )}
        </>
    )
}


function formatBytes(bytes: number, decimals = 1) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
