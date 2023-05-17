import { Editor } from "@tinymce/tinymce-react"
import { useCallback, useRef, useState } from "react";

const TINY_API_KEY = "ajele2r9opr9w00237cezbg50x5f0de6y3unf8pltinypbgd"

const defaultInitProps = {
    height: 500,
    width: "100%",
    menubar: false,
    content_style: 'body { font-family: DM Sans, Helvetica, Arial, sans-serif; font-size:14px }'
}

export default function TextEditor({ initProps={}, ...rest })
{
    const editorRef = useRef(null);
    const currentInitProps = { ...defaultInitProps, ...initProps }

    const handleOnInit = useCallback((evt, editor) => {
        editorRef.current = editor
    })

    return (
        <>
            <Editor
                apiKey={TINY_API_KEY}
                onInit={handleOnInit}

                init={{
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table'
                    ],
                    toolbar: 'blocks bold italic forecolor | alignleft aligncenter alignright alignjustify | link image media | bullist numlist table outdent indent | removeformat',
                    ...currentInitProps
                }}

                {...rest}
            />
        </>
    )
}