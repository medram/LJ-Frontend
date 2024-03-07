import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ForwardedRef, ReactNode } from "react"


export default React.memo(React.forwardRef(function SuperButton({ref, ...props}: {
    isLoading: boolean,
    loadingText: string,
    children: ReactNode,
    spinnerClassName: string,
    ref?: ForwardedRef<HTMLButtonElement>,
    [key: string]: unknown
})
{
    let { isLoading = false, loadingText, children, spinnerClassName = "", ...rest } = props

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
