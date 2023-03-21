import LoadingSection from "../../components/LoadingSection";
import { useCustomers } from "../../hooks/admin";


export default function CustomersPage()
{
    const { isLoading, isError, error, customers } = useCustomers()

    if (isError)
    {
        return <span>{error}</span>
    }

    return <>
        <h1 className="mb-5">Customers</h1>
        <div className="row">
            {isLoading? (
                <LoadingSection />
            ): (
                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers?.map((customer, i) => {
                                return <tr key={i}>
                                    <td>{customer.id}</td>
                                    <td>{customer.username}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.status}</td>
                                    <td>-</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </>
}
