import { MotionModel, MotionModelContent } from "@components/animations"
import LoginRegisterForms from "@components/forms/LoginRegisterForms"
import { AnimatePresence } from "framer-motion"
import { ReactNode, useCallback, useState } from "react"
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

type ModelProps = {
    title: string,
    children: ReactNode,
    footer?: ReactNode,
    center?: boolean
}

export function useModel() {
    const [isOpen, setOpen] = useState(false)

    const ref = useClickOutside((e: any) => {
        e.preventDefault()

        if (isOpen && e.target.nodeName === "DIV")
        {
            setOpen(false)
        }
    });

    const ID = `#model-${Math.random() * 10000000}`

    const open = useCallback(() => {
        setOpen(true)
    }, []);

    const close = useCallback(() => {
        setOpen(false)
    }, []);

    const toggle = useCallback(() => {
        setOpen(!isOpen)
    }, []);


    const Model = useCallback(function({ title, children, footer, center=true }: ModelProps){

        return (
            <AnimatePresence>
                {isOpen && <MotionModel
                    className="modal show"
                    style={{ display: "block" }}
                    id={ID}
                    tabIndex="-1"
                >
                    <div className={["modal-dialog", center && "modal-dialog-centered" ].join(" ")} role="document" ref={ref}>

                        <MotionModelContent className="modal-content">
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
                        </MotionModelContent>

                    </div>
                </MotionModel>}
            </AnimatePresence>
        )
    }, [isOpen])

    return { isOpen, open, close, toggle, Model: Model }
}


export function useLoginRegister()
{
    const { isOpen, open, close, toggle, Model: RegisterModel } = useModel()


    const LoginRegisterModel = useCallback(({ title, ...rest }: {title: string, [rest: string]: unknown}) => {
        return (
            <RegisterModel title={title}>
                <LoginRegisterForms {...rest} />
            </RegisterModel>
        )
    }, [isOpen])

    return { isOpen, open, close, LoginRegisterModel }
}
