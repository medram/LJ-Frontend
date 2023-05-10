import { faCreditCard, faGear, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SectionLoading from "../../components/SectionLoading";
import Swal from "sweetalert2";
import { getPlans } from "../../api/admin";
import { useDashboardPlans, useSettings } from "../../hooks";


export default function PlansPage() {

    const queryClient = useQueryClient()
    const { isLoading, isError, error, plans } = useDashboardPlans()

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

    const monthlyPlans = plans.filter(plan => plan.billing_cycle === "monthly")
    const yearlyPlans = plans.filter(plan => plan.billing_cycle === "yearly")

    return <>
        <h1 className="mb-3">Plans</h1>
        <div className="d-flex flex-row-reverse gap-3 mb-4">
            <Link to="add" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> New Plan</Link>
            <Link to="#" className="btn btn-primary"><FontAwesomeIcon icon={faCreditCard} /> Manage Payment methods</Link>
            <Link to="#" className="btn btn-primary"><FontAwesomeIcon icon={faGear} /> Manage Free Trail / demo</Link>
        </div>

        <div className="row">
            <div className="col-12">
                <section className="bg-light rounded p-4">
                    <h2 className="h6 mb-3">Monthly plans:</h2>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Popular</th>
                                <th>Status</th>
                                <th>Created at</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyPlans?.map((plan, i) => {
                                return <tr key={i}>
                                    <td>{plan.name} {plan.is_free ? <span className="badge bg-success">Free</span> : ""}</td>
                                    <td>{plan.price}<small>/month</small></td>
                                    <td>{plan.is_popular ? (
                                        <span className="badge text-bg-success">Yes</span>
                                    ) : (
                                        <span className="badge text-bg-warning">No</span>
                                    )}</td>
                                    <td>{plan.status ? (
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

                            {!monthlyPlans.length && (<tr><td colSpan={6} className="text-center">N/A</td></tr>)}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <section className="bg-light rounded p-4">
                    <h2 className="h6 mb-3">Yearly plans:</h2>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Popular</th>
                                <th>Status</th>
                                <th>Created at</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yearlyPlans?.map((plan, i) => {
                                return <tr key={i}>
                                    <td>{plan.name} {plan.is_free ? <span className="badge bg-success">Free</span> : ""}</td>
                                    <td>{plan.price}<small>/year</small></td>
                                    <td>{plan.is_popular ? (
                                        <span className="badge text-bg-success">Yes</span>
                                    ) : (
                                        <span className="badge text-bg-warning">No</span>
                                    )}</td>
                                    <td>{plan.status ? (
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

                            {!yearlyPlans.length && (<tr><td colSpan={6} className="text-center">N/A</td></tr>)}

                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    </>
}
