import { faCreditCard, faGear, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SectionLoading from "../../components/SectionLoading";
import Swal from "sweetalert2";
import { deletePlan, getPlans } from "../../api/admin";
import { useDashboardPlans, useDemo, useSettings } from "../../hooks";
import { useRef, useState } from "react";
import { useOffCanvas } from "../../hooks/templates";
import CustomOffCanvas from "../../components/CustomOffCanvas";
import AddPlanForm from "../../components/dashboard/forms/AddPlanForm";
import EditPlanForm from "../../components/dashboard/forms/EditPlanForm";
import { datetimeFormat } from "../../utils";
import ManageTrialForm from "../../components/dashboard/forms/ManageTrialForm";


export default function PlansPage()
{
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()
    const { isLoading, isError, error, plans } = useDashboardPlans()
    const { isOpen, open, close, offCanvasProps } = useOffCanvas()
    const { isOpen: isEditOpen, open: editOpen, close: editClose, offCanvasProps: editPlanOffCanvasProps } = useOffCanvas()
    const { isOpen: isTrialOpen, open: trialOpen, close: trialClose, offCanvasProps: trialOffCanvasProps } = useOffCanvas()
    const { isLoading: settingsIsLoading, settings } = useSettings()
    const [ planToEdit, setPlanToEdit ] = useState(0)


    if (isLoading || settingsIsLoading) {
        return <SectionLoading />
    }

    if (isError) {
        return toast.error(error.message)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this plan?",
            icon: "warning",
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel!",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (isDemo)
                    return toast.success("This action isn't allowed on the demo mode!")

                deletePlan(id).then(data => {
                    if (!data?.errors) {
                        queryClient.invalidateQueries("admin.plans")
                        toast.success(data?.message)
                    }
                    else {
                        toast.error(data?.message)
                    }
                }) // delete plan by ID
            }
        })
    }

    const handleEditPlan = (planId) => {
        setPlanToEdit(planId)
        editOpen(true)
    }

    const monthlyPlans = plans.filter(plan => plan.billing_cycle === "monthly")
    const yearlyPlans = plans.filter(plan => plan.billing_cycle === "yearly")


    return <>
        <h1 className="mb-3">Plans</h1>
        <div className="d-flex flex-row-reverse gap-3 mb-4">
            <button className="btn btn-primary" onClick={open}><FontAwesomeIcon icon={faPlus} /> New Plan</button>

            <Link to="../payment-methods" className="btn btn-primary"><FontAwesomeIcon icon={faCreditCard} /> Manage Payment methods</Link>

            {/* <button className="btn btn-primary" onClick={trialOpen} ><FontAwesomeIcon icon={faGear} /> Manage Free Trial / demo</button> */}
        </div>

        <div className="row">
            <div className="col-12">
                <section className="bg-light rounded p-4">
                    <h2 className="h6 mb-3"><b>Monthly plans:</b></h2>
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
                                    <td>{settings?.CURRENCY_SYMBOL}{plan.price}<small>/month</small></td>
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
                                    <td>{datetimeFormat(plan.created_at)}</td>
                                    <td>
                                        <button onClick={() => handleEditPlan(plan.id)} className="btn btn-primary btn-sm  mx-1 mb-1"><FontAwesomeIcon icon={faPen} /></button>

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
                    <h2 className="h6 mb-3"><b>Yearly plans:</b></h2>
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
                                    <td>{settings?.CURRENCY_SYMBOL}{plan.price}<small>/year</small></td>
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
                                    <td>{datetimeFormat(plan.created_at)}</td>
                                    <td>
                                        <button onClick={() => handleEditPlan(plan.id)} className="btn btn-primary btn-sm  mx-1 mb-1"><FontAwesomeIcon icon={faPen} /></button>

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

        <CustomOffCanvas title="New Plan" placement="end" {...offCanvasProps} >
           <AddPlanForm close={close} />
        </CustomOffCanvas>

        <CustomOffCanvas title="Edit Plan" placement="end" {...editPlanOffCanvasProps}>
            <EditPlanForm close={editClose} planId={planToEdit} />
        </CustomOffCanvas>

        {/* <CustomOffCanvas title="Manage Free Trial / demo" placement="end" {...trialOffCanvasProps}>
            <ManageTrialForm close={trialClose} />
        </CustomOffCanvas> */}

    </>
}
