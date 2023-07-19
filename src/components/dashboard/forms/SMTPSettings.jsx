import { faFloppyDisk, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select"
import { toastFormikErrors } from "../../../utils";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { saveDashboardSettings } from "../../../api/admin";
import SuperButton from "../../SuperButton";
import { useQueryClient } from "react-query";
import * as Yup from "yup"
import Switch from "../../Switch";
import PasswordInput from "../../PasswordInput";
import { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import SendTestEmailModelForm from "./SendTestEmailModelForm";
import { useDemo } from "../../../hooks";


const SMTP_MAIL_ENCRIPTION_OPTIONS = [
    { label: "SSL", value: "ssl" },
    { label: "TLS", value: "tls" }
]


export default function SMTPSettings({ settings }) {
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()
    const [showSendEmailForm, setShowSendEmailForm ] = useState(false)

    const formik = useFormik({
        initialValues: {
            "SMTP_HOST": settings.SMTP_HOST,
            "SMTP_PORT": settings.SMTP_PORT,
            "SMTP_USER": settings.SMTP_USER,
            "SMTP_PASSWORD": settings.SMTP_PASSWORD,
            "SMTP_MAIL_ENCRIPTION": settings.SMTP_MAIL_ENCRIPTION,
            "SMTP_ALLOW_INSECURE_MODE": settings.SMTP_ALLOW_INSECURE_MODE,
        },
        validationSchema: Yup.object({
            "SMTP_HOST": Yup.string().required("SMTP Host is required"),
            "SMTP_PORT": Yup.number("SMTP Port must be an integer.").required("SMTP Port is required"),
            "SMTP_USER": Yup.string().required("SMTP User is required"),
            "SMTP_PASSWORD": Yup.string().required("SMTP Password is required"),
            "SMTP_MAIL_ENCRIPTION": Yup.string().required("SMTP Mail Encription is required"),
            "SMTP_ALLOW_INSECURE_MODE": Yup.boolean()
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            if (isDemo)
                return toast.success("This action isn't allowed on the demo mode!")

            saveDashboardSettings(values).then((data) => {
                if (data?.errors)
                {
                    toast.error(data?.message)
                }
                else
                {
                    queryClient.invalidateQueries("admin.settings")
                    queryClient.invalidateQueries("settings")
                    toast.success(data.message)
                }
            }).catch(err => {
                toast.error(err)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })


    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="smtp_host">SMTP Host:</label>
                    <input type="text" className="form-control" placeholder="e.g. mail.domain.com" id="smtp_host" {...formik.getFieldProps("SMTP_HOST")} />
                </div>

                <div className="mb-4">
                    <label htmlFor="smtp_port">SMTP Port:</label>
                    <input type="number" className="form-control" placeholder="e.g. 465 or 587" id="smtp_port" {...formik.getFieldProps("SMTP_PORT")} />
                </div>

                <div className="mb-4">
                    <label htmlFor="smtp_user">SMTP User:</label>
                    <input type="text" className="form-control" placeholder="e.g. contact@domain.com" id="smtp_user" {...formik.getFieldProps("SMTP_USER")} />
                </div>

                <div className="mb-4">
                    <label htmlFor="smtp_password">SMTP Password:</label>
                    <PasswordInput {...formik.getFieldProps("SMTP_PASSWORD")} />
                </div>

                <div className="row">
                    <div className="mb-4 col-md-4 col-sm-12">
                        <label htmlFor="smtp-mail-encription">SMTP Mail Encription:</label>
                        <Select options={SMTP_MAIL_ENCRIPTION_OPTIONS} isSearchable={false} defaultValue={SMTP_MAIL_ENCRIPTION_OPTIONS[0]} id="smtp-mail-encription" onChange={(option) => formik.setFieldValue("SMTP_MAIL_ENCRIPTION", option.value)} />
                    </div>
                </div>

                <div className="d-flex mb-5">
                    <Switch onChange={(checked) => formik.setFieldValue("SMTP_ALLOW_INSECURE_MODE", checked)} name="insecure-mode" checked={!!formik.values.SMTP_ALLOW_INSECURE_MODE} size="small" className="mx-2 mt-1" />

                    <label htmlFor="insecure-mode" className="form-label" onClick={() => formik.setFieldValue("SMTP_ALLOW_INSECURE_MODE", !formik.values.SMTP_ALLOW_INSECURE_MODE)} >Allow insecure mode.</label>
                </div>

                <div className="d-flex flex-row-reverse gap-3 mb-4">
                    <SuperButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting} className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>
                        <FontAwesomeIcon icon={faFloppyDisk} /> Save
                    </SuperButton>

                    <SuperButton className="btn btn-primary" onClick={(e) => {
                            e.preventDefault()
                            setShowSendEmailForm(true)
                        }}>
                        <FontAwesomeIcon icon={faPaperPlane} /> Send a test email
                    </SuperButton>
                </div>
            </form>

            <SendTestEmailModelForm show={showSendEmailForm} onHide={() => setShowSendEmailForm(false)} setShow={setShowSendEmailForm} />
        </>
    )
}
