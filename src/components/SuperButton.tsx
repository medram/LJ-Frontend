import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ForwardedRef, ReactNode } from "react"

type SuperButtonProps = {
    isLoading: boolean,
    loadingText: string,
    children: ReactNode,
    spinnerClassName: string,
    ref: ForwardedRef<HTMLButtonElement>
    [key: string]: unknown
}

export default React.memo(React.forwardRef(function SuperButton(props: SuperButtonProps)
{
    let { isLoading = false, loadingText, children, spinnerClassName = "", ref, ...rest } = props

    return (
        <button ref={ref} disabled={isLoading} {...rest} >
            {isLoading? (
                <>
                    <FontAwesomeIcon icon={faCircleNotch} spin className={["spinner-border-sm", spinnerClassName].join(" ")} /> {loadingText}
                </>
            ): (
               <>{children}</>
            )}
        </button>
    )
}))
