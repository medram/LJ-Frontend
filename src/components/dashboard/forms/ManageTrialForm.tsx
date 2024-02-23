import { useFormik } from "formik"
import { useSettings } from "../../../hooks"
import SectionLoading from "../../SectionLoading"
import * as Yup from "yup"
import { Alert } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import SuperButton from "../../SuperButton"
import { toastFormikErrors } from "../../../utils"


export default function ManageTrialForm()
{
    const { isLoading, settings } = useSettings()

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: Yup.object({

        }),
        onSubmit: (values) => {
            console.log(values)
        }
    })

    if (isLoading || !Object.keys(settings).length)
    {
        return <SectionLoading center={true} />
    }


    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="mb-4">
                <label htmlFor="name">Trial duration:</label>
                <input type="number" className="form-control" placeholder="e.g. 7 days" id="name" {...formik.getFieldProps("name")} min={0} />
            </div>

            <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary btn-lg btn-block" onClick={() => toastFormikErrors(formik.errors)}>Save</SuperButton>

            <Alert variant="info" className="mt-4">
                <Alert.Heading><FontAwesomeIcon icon={faCircleInfo} /> Important</Alert.Heading>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea quidem, incidunt officia adipisci nihil eaque, repellat voluptatem quasi quo minus cum rerum earum accusantium! Vitae omnis aut rem aliquid blanditiis.</p>
            </Alert>
        </form>
    )
}
