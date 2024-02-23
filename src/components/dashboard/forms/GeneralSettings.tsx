import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { uploadFile } from "../../../api";
import { saveDashboardSettings } from "../../../api/admin";
import { useDemo } from "../../../hooks";
import { AVAILABLE_TIMEZONES_OPTIONS, CURRENCY_OPTIONS, toastFormikErrors } from "../../../utils";
import Dropzone from "../../Dropzone";
import SuperButton from "../../SuperButton";
import Switch from "../../Switch";


const CURRENCY_POSITIONS = [
    {label: "$xxx (left)", value: "LEFT"},
    {label: "xxx$ (right)", value: "RIGHT"},
]

const onUpload = ({ files, setProgress, setIsSuccessUpload, resetDropzone, name, formik }) => {

    uploadFile("admin/upload", files[0], {
        onUploadProgress: (e) => {
            setProgress(e.loaded / e.total * 100)
        }
    }).then((res) => {
        if (res.data && !res.data?.errors)
        {
            formik.setFieldValue(name, res.data?.url)
            toast.info("Ensure to save the settings.")
            setIsSuccessUpload(true)
        }
        else
        {
            toast.error(res.data?.message)
            resetDropzone()
        }
    }).catch(err => {
        toast.error(err.message)
        resetDropzone()
    })
}

const onError = (rejectedFiles) => {
    toast.error("Invalid image!")
}

export default function GeneralSettings({ settings })
{
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            "SITE_NAME": settings.SITE_NAME,
            "SITE_LOGO": settings.SITE_LOGO,
            "SITE_KEYWORDS": settings.SITE_KEYWORDS,
            "SITE_DESC": settings.SITE_DESC,
            "SHOW_LOGO": settings.SHOW_LOGO,
            "SITE_FAVICON": settings.SITE_FAVICON,
            "TIMEZONE": settings.TIMEZONE,
            "CURRENCY": settings.CURRENCY,
            "CURRENCY_SYMBOL": settings.CURRENCY_SYMBOL,
            "CURRENCY_POSITION": settings.CURRENCY_POSITION,
            "HEAD_CODE": settings.HEAD_CODE,
        },
        validationSchema: Yup.object({
            "SITE_NAME": Yup.string().required("Site Name is required"),
            "SITE_KEYWORDS": Yup.string(),
            "SITE_DESC": Yup.string(),
            "SITE_LOGO": Yup.string(),
            "SHOW_LOGO": Yup.boolean(),
            "SITE_FAVICON": Yup.string(),
            "TIMEZONE": Yup.string().required("Timezone is required."),
            "CURRENCY": Yup.string().required("Currency is required."),
            "CURRENCY_SYMBOL": Yup.string().required("Currency symbol is required."),
            "CURRENCY_POSITION": Yup.string().required("Currency position is required."),
            "HEAD_CODE": Yup.string()
        }),
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


    const defaultCurrency = { label: formik.values.CURRENCY, value: formik.values.CURRENCY }
    const defaultTimezone = { label: formik.values.TIMEZONE, value: formik.values.TIMEZONE }
    const defaultCurrencyPosition = { label: formik.values.CURRENCY_POSITION, value: formik.values.CURRENCY_POSITION }


    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="sitename">Site Name:</label>
                    <input type="text" className="form-control" placeholder="" id="sitename" {...formik.getFieldProps("SITE_NAME")} />
                </div>
                <div className="row">
                    <div className="mb-4 col-md-6">
                        <label htmlFor="logo">Logo:</label>
                        <input type="hidden" {...formik.getFieldProps("SITE_LOGO")} />
                        <Dropzone onUpload={onUpload} onError={onError} name="SITE_LOGO" extraOnUploadProps={{formik}} />
                    </div>
                    <div className="mb-4 col-md-6">
                        <label htmlFor="favicon">Favicon:</label>
                        <input type="hidden" {...formik.getFieldProps("SITE_FAVICON")} />
                        <Dropzone onUpload={onUpload} onError={onError} name="SITE_FAVICON" extraOnUploadProps={{ formik }} />
                    </div>
                </div>
                <div className="d-flex mb-5">
                    <Switch onChange={(checked) => formik.setFieldValue("SHOW_LOGO", checked)} name="show-logo" checked={!!formik.values.SHOW_LOGO} size="small" className="mx-2 mt-1" />

                    <label htmlFor="show-logo" className="form-label" onClick={() => formik.setFieldValue("SHOW_LOGO", !formik.values.SHOW_LOGO)} >show logo instead of site name.</label>
                </div>
                <div className="row mb-4">
                    <div className="col-lg-4 col-12">
                        <label htmlFor="timezone">Timezone:</label>
                        <Select options={AVAILABLE_TIMEZONES_OPTIONS} defaultValue={defaultTimezone} id="timezone" onChange={(option) => formik.setFieldValue("TIMEZONE", option.value)} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="mb-6 col-md-6">
                        <label htmlFor="currency">Currency:</label>

                        <Select options={CURRENCY_OPTIONS} defaultValue={defaultCurrency} onChange={(option) => formik.setFieldValue("CURRENCY", option.value)} />
                    </div>
                    <div className="mb-6 col-md-6">
                        <label htmlFor="currency_symbol">Currency symbol:</label>
                        <input type="text" className="form-control" placeholder="e.g. $" id="currency_symbol" {...formik.getFieldProps("CURRENCY_SYMBOL")} />
                    </div>
                    {/* <div className="mb-4 col-md-4">
                        <label htmlFor="currency_symbol_position">Currency symbol position:</label>
                        <Select options={CURRENCY_POSITIONS} isSearchable={false} defaultValue={defaultCurrencyPosition || CURRENCY_POSITIONS[0]} id="currency_symbol_position" onChange={(option) => formik.setFieldValue("CURRENCY_POSITION", option.value)} />
                    </div> */}
                </div>

                <div className="row">
                    <div className="mb-4">
                        <label htmlFor="site_keywords">SEO Keywords:</label>
                        <input type="text" className="form-control" id="site_keywords"
                        placeholder="e.g. keyword1, keyword2, keyword3, ...etc"
                        {...formik.getFieldProps("SITE_KEYWORDS")} />

                        <small><i><b>Note:</b> keywords should be separated by comma "<b>,</b>".</i></small>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="site_desc">SEO Description:</label>
                        <textarea rows={7} className="form-control" id="site_desc" placeholder="A small description for Search Engins." {...formik.getFieldProps("SITE_DESC")} ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="head_code">Head Code:</label>
                        <textarea rows={7} className="form-control" id="head_code" placeholder="Any code added here will be injected between <head> tags (e.g. Javascript code)" {...formik.getFieldProps("HEAD_CODE")} ></textarea>
                    </div>

                </div>

                <div className="d-flex flex-row-reverse gap-3 mb-4">
                    <SuperButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting} className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>
                        <FontAwesomeIcon icon={faFloppyDisk} /> Save
                    </SuperButton>
                </div>
            </form>
        </>
    )
}
