import { CustomerType } from "@/utils/types";
import { deleteCustomer } from "@api/admin";
import AdvancedDataTable from "@components/AdvancedDataTable";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCustomers } from "@hooks/admin";
import { useDemo } from "@hooks/index";
import { datetimeFormat } from "@utils/index";
import { useMemo } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


export default function CustomersPage()
{
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()
    const { isError, error, customers } = useCustomers()

    const columns = useMemo(() => [
        {
            name: "ID",
            sortable: true,
            selector: (customer: CustomerType) => customer.id
        },
        {
            name: "Username",
            sortable: true,
            selector: customer => customer.username
        },
        {
            name: "Email",
            sortable: true,
            selector: (customer: CustomerType) => customer.email
        },
        {
            name: "Status",
            selector: (customer: CustomerType) => {
                return customer.is_active ? (
                    <span className="badge text-bg-success">Active</span>
                ) : (
                    <span className="badge text-bg-warning">Inactive</span>
                )
            }
        },
        {
            name: "Joined",
            sortable: true,
            selector: (customer: CustomerType) => datetimeFormat(customer.created_at)
        },
        {
            name: "Actions",
            selector: (customer: CustomerType) => (
                <>
                    <Link to={`edit/${customer.id}`} className="btn btn-primary btn-sm  mx-1 mb-1"><FontAwesomeIcon icon={faPen} /></Link>

                    <button onClick={() => handleDelete(customer.id)} className="btn btn-danger btn-sm mx-1 mb-1"><FontAwesomeIcon icon={faTrash} /></button>
                </>
            )
        },
    ], [])


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
                if (isDemo)
                    return toast.success("This action isn't allowed on the demo mode!")

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

        <div className="row">
            <div className="col-12">
                <section className="bg-light rounded p-4">

                    <AdvancedDataTable
                        columns={columns}
                        data={customers}
                        pagination
                        subHeader
                        subHeaderComponent={(
                            <Link to="add" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Customer</Link>
                        )}
                        searchFunction={(item, searchQuery) => {
                            return item.email.toLowerCase()?.includes(searchQuery) || item.username.toLowerCase()?.includes(searchQuery)
                        }}
                    />
                </section>
            </div>
        </div>
    </>
}
