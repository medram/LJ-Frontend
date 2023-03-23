import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SectionLoading from "../../components/SectionLoading";
import Swal from "sweetalert2";
import { getPlans } from "../../api/admin";


export default function PlansPage() {

    const queryClient = useQueryClient()
    const { isLoading, isError, error, data: plans } = useQuery("admin.plans", getPlans, {staleTime: Infinity})



    if (isLoading) {
        return <SectionLoading />
    }

    if (isError) {
        return toast.error(error.message)
    }

    const handleDelete = (id) => {
        // Swal.fire({
        //     title: "Are you sure you want to delete this customer?",
        //     icon: "warning",
        //     confirmButtonText: "Yes, delete!",
        //     cancelButtonText: "No, cancel!",
        //     showCancelButton: true
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         deleteCustomer(id).then(data => {
        //             if (!data?.errors) {
        //                 queryClient.invalidateQueries("admin.customers")
        //                 toast.success(data?.message)
        //             }
        //             else {
        //                 toast.error(data?.message)
        //             }
        //         }) // delete plan by ID
        //     }
        // })
    }

    return <>
        <h1 className="mb-3">Customers</h1>
        <div className="d-flex flex-row-reverse gap-3 mb-4">
            <Link to="add" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> New Plan</Link>
        </div>

        <div className="row">
            <div className="col-12">
                <section className="bg-light rounded p-4">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Images</th>
                                <th>Status</th>
                                <th>Created at</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans?.map((plan, i) => {
                                return <tr key={i}>
                                    <td>{plan.id}</td>
                                    <td>{plan.name}</td>
                                    <td>{plan.images}</td>
                                    <td>{plan.is_active ? (
                                        <span className="badge text-bg-success">Active</span>
                                    ) : (
                                        <span className="badge text-bg-warning">Inactive</span>
                                    )}</td>
                                    <td>{plan.created_at}</td>
                                    <td>
                                        <Link to={`edit/${plan.id}`} className="btn btn-primary btn-sm  mx-1 mb-1"><FontAwesomeIcon icon={faPen} /></Link>

                                        <button onClick={() => handleDelete(plan.id)} className="btn btn-danger btn-sm mx-1 mb-1"><FontAwesomeIcon icon={faTrash} /></button>
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
