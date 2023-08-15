import { memo, useCallback, useState } from "react"
import { useClickOutside } from "."


export function useOffCanvas()
{
    const [isOpen, setOpen] = useState(false)

    const open = useCallback(() => {
        setOpen(true)
    }, [])

    const close = useCallback(() => {
        setOpen(false)
    }, [])

    const toggle = useCallback(() => {
        setOpen(!isOpen)
    }, [])

    return { isOpen, setOpen, open, close, toggle, offCanvasProps: {isOpen, setOpen} }
}


export function useModel() {
    const [isOpen, setOpen] = useState(false)

    const ref = useClickOutside((e) => {
        if (isOpen && !(["BUTTON", "svg", "path"]).includes(e.target.nodeName))
        {
            console.log('Clicked outside!', isOpen)
            setOpen(false)
        }
    });

    const ID = "#model-" + parseInt(Math.random() * 10000000)

    const open = useCallback(() => {
        console.log("Opened")
        setOpen(true)
    }, []);

    const close = useCallback(() => {
        console.log("Closed")
        setOpen(false)
    }, []);

    const toggle = useCallback(() => {
        console.log("Toggled")
        setOpen(!isOpen)
    }, []);

    console.log("useModel render")

    const Model = useCallback(function({ title, children, footer }){
        console.log("Model render")
        return (
            <div
                className={isOpen ? "modal show" : "modal"}
                style={{ display: isOpen ? "block" : "none" }}
                id={ID}
                tabIndex="-1"
            >
                <div className="modal-dialog" role="document" ref={ref}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={close}
                            ></button>
                        </div>
                        <div className="modal-body">{children}</div>
                        {footer && <div className="modal-footer">{footer}</div>}
                    </div>
                </div>
            </div>
        )
    }, [isOpen])

    return { isOpen, open, close, toggle, Model: Model }
}
