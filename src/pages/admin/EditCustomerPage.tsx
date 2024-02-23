import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"
import { customerDetails, updateCustomer } from "../../api/admin"
import GoBackButton from "../../components/GoBackButton"
import SectionLoading from "../../components/SectionLoading"
import SuperButton from "../../components/SuperButton"
import Switch from "../../components/Switch"
import { toastFormikErrors } from "../../utils"
import PasswordInput from "../../components/PasswordInput"


export default function EditCustomerPage()
{
    const { id } = useParams()
    const { isLoading, isError, error, data: customer } = useQuery(`admin.customer.${id}`, () => customerDetails(id), {staleTime: Infinity})

    const navigate = useNavigate()
    const queryClient = useQueryClient()


    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            is_active: false
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required."),
            email: Yup.string().required("Email is required.").email("Invalid email address!"),
            password: Yup.string().min(6, "Password must be 6 characters or more.")
        }),
        onSubmit: (values) => {
            updateCustomer(customer?.id, values).then((data) => {
                if (data.errors === false) {
                    formik.resetForm()
                    toast.success(data.message)
                    queryClient.invalidateQueries('admin.customers')
                    queryClient.invalidateQueries(`admin.customer.${id}`)
                    return navigate(-1)
                }
                return toast.error(data.message)
            }).catch(error => {
                toast.error(error.response.data.message)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })

    useEffect(() => {
        if (!isLoading && customer)
        {
            formik.setValues({
                username: customer.username,
                email: customer.email,
                password: "",
                is_active: !!customer.is_active
            })
        }
    }, [customer])


    if (isLoading)
    {
        return <SectionLoading />
    }

    if (isError)
    {
        toast.error(error.message)
    }


    return (
        <>
            <h1 className="mb-3">Edit Customer</h1>
            <div className="row">
                <div className="col-7">
                    <GoBackButton />
                    <section className="bg-light rounded p-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username">Username:</label>
                                <input type="text" className="form-control" id="username" {...formik.getFieldProps("username")} value={formik.values.username} />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email">Email:</label>
                                <input type="text" className="form-control" id="email" {...formik.getFieldProps("email")} />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password">Change Password:</label>
                                <PasswordInput className="form-control" id="password" {...formik.getFieldProps("password")} />
                            </div>

                            <div className="d-flex mb-3">
                                <Switch onChange={(checked) => formik.setFieldValue("is_active", checked)} name="accept" checked={!!formik.values.is_active} size="small" className="mx-2 mt-1" />

                                <label htmlFor="is_active" className="form-label" onClick={() => formik.setFieldValue("is_active", !formik.values.is_active)} >Active</label>
                            </div>

                            <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>Update</SuperButton>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}
