import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCustomer } from "../../api/admin";
import SectionLoading from "../../components/SectionLoading";
import { useCustomers } from "../../hooks/admin";
import Swal from "sweetalert2";


export default function CustomersPage()
{
    const [ search, setSearch ] = useState("")
    const [ customersList, setCustomersList ] = useState([])
    const queryClient = useQueryClient()
    const { isLoading, isError, error, customers } = useCustomers()

    // Perform search
    useEffect(() => {
        if (search.length)
        {
            console.log('search...')
            setCustomersList(customers?.filter(customer => {
                return customer.email.toLowerCase()?.includes(search) || customer.username.toLowerCase()?.includes(search)
            }))
        }
        else {
            setCustomersList(customers)
        }
    }, [search])

    // Sync Customers with CustomersList
    useEffect(() => {
        if (customers)
        {
            setCustomersList(customers)
        }
    }, [customers])

    if (isLoading)
    {
        return <SectionLoading />
    }

    if (isError)
    {
        return toast.error(error.message)
    }

    const handleDelete = (customer_id) => {
        Swal.fire({
            title: "Are you sure you want to delete this customer?",
            icon: "warning",
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel!",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed)
            {
                deleteCustomer(customer_id).then(data => {
                    if (!data?.errors)
                    {
                        queryClient.invalidateQueries("admin.customers")
                        toast.success(data?.message)
                    }
                    else
                    {
                        toast.error(data?.message)
                    }
                }) // delete customer by ID
            }
        })
    }

    return <>
        <h1 className="mb-3">Customers</h1>
        <div className="d-flex flex-row-reverse gap-3 mb-4">
            <Link to="add" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Customer</Link>

            <div className="col">
                <input type="text" name="search" className="form-control w-50-md w-100 float-end" placeholder="Search..." onChange={(e) => setSearch(e.target.value?.toLowerCase())} value={search}  />
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <section className="bg-light rounded p-4">
                    <table className="table table-responsive">
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
                            {customersList?.map((customer, i) => {
                                return <tr key={i}>
                                    <td>{customer.id}</td>
                                    <td>{customer.username}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.is_active? (
                                        <span className="badge text-bg-success">Active</span>
                                    ): (
                                            <span className="badge text-bg-warning">Inactive</span>
                                    )}</td>
                                    <td>{customer.created_at}</td>
                                    <td>
                                        <Link to={`edit/${customer.id}`} className="btn btn-primary btn-sm  mx-1 mb-1"><FontAwesomeIcon icon={faPen} /></Link>

                                        <button onClick={() => handleDelete(customer.id)} className="btn btn-danger btn-sm mx-1 mb-1"><FontAwesomeIcon icon={faTrash} /></button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    </>
}
