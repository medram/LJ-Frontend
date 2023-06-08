import React from "react"


export default React.memo(React.forwardRef(function SuperButton(props, ref)
{
    let { isLoading = false, loadingText, children, spinnerClassName = "", ...rest } = props


    return (
        <button ref={ref} disabled={isLoading} {...rest} >
            {isLoading? (
                <>
                    <span className={["spinner-border spinner-border-sm", spinnerClassName].join(" ")}></span> {loadingText}
                </>
            ): (
               <>{children}</>
            )}
        </button>
    )
}))
