import { useDropzone } from "react-dropzone"


export default function Dropzone()
{
    const onDrop = (files) => {
        files.map(file => console.log(file.path))
    }

    const { getRootProps, getInputProps, acceptedFiles, isFocused, isDragAccept, isDragActive } = useDropzone({
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
        maxSize: 1024 * 1024, // in bytes
        multiple: false,
        onDrop: onDrop
    })

    return (
        <div {...getRootProps()} className={(isFocused || isDragAccept || isDragActive) ? "dropzone focused" : "dropzone"}>
            <p>Drag & Drop image (png, jpg, jpeg)</p>
            <p>Max size 1MB</p>
            <input {...getInputProps()} />
        </div>
    )
}
