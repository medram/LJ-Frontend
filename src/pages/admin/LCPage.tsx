import { Navigate } from "react-router-dom"
import { useLC } from "../../hooks/admin"


export default function LCPage()
{
    const { isLoading, isActive } = useLC()


    if (!isLoading && isActive)
    {
        return <Navigate to="/admin" replace={true} />
    }

    return (
        <div className="alert alert-warning" style={{borderRadius: "0px"}}>Invalid License Code, please check your License Code again or reach support for help!</div>
    )
}
