import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"


export default React.memo(React.forwardRef(function SuperButton(props, ref)
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
