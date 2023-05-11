import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import CustomOffCanvas from "../components/CustomOffCanvas";



export function useOffCanvas()
{
    const [isOpen, setOpen] = useState(false)

    const open = useCallback(() => {
        setOpen(true)
    })

    const close = useCallback(() => {
        setOpen(false)
    })

    const toggle = useCallback(() => {
        setOpen(!isOpen)
    })

    return { isOpen, setOpen, open, close, toggle, offCanvasProps: {isOpen, setOpen} }
}
