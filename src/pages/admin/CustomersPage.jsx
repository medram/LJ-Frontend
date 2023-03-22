import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomerAdd from "../../components/dashboard/CustomerAdd";
import SectionLoading from "../../components/SectionLoading";
import { useCustomers } from "../../hooks/admin";


export default function CustomersPage()
{
    const { isLoading, isError, error, customers } = useCustomers()
    const [ addMode, setAddMode ] = useState(false)


    if (isLoading)
    {
        return <SectionLoading />
    }

    if (isError)
    {
        return toast.error(error.message)
    }

    if (addMode)
    {
        return <CustomerAdd onGoBack={() => setAddMode(false)} />
    }

    return <>
        <h1 className="mb-3">Customers</h1>
        <div className="d-flex flex-row-reverse mb-4 text-right">
            <button onClick={() => setAddMode(true)} className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Customer</button>
        </div>

        <div className="row">
            <div className="col-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Joined</th>
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
                                <td>{customer.created_at}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm mx-1"><FontAwesomeIcon icon={faPen} /></button>

                                    <button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
