

export default function SuperButton(props)
{
    let { isLoading = false, loadingText = "Loading...", children, spinnerClassName = "", ...rest } = props


    return (
        <button disabled={isLoading} {...rest} >
            {isLoading? (
                <>
                    <span className={["spinner-border spinner-border-sm", spinnerClassName].join(" ")}></span> {loadingText}
                </>
            ): (
               <>{children}</>
            )}
        </button>
    )
}
