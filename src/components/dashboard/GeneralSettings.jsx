import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Select from "react-select"
import { AVAILABLE_TIMEZONES_OPTIONS } from "../../utils";
import Dropzone from "../Dropzone"
import axiosApi from "../../api/axiosApi";
import { uploadFile } from "../../api";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useDashboardSettings, useSettings } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import SectionLoading from "../SectionLoading";
import { saveDashboardSettings } from "../../api/admin";
import SuperButton from "../SuperBotton";
import { useQueryClient } from "react-query";


const CURRENCY_POSITIONS = [
    {label: "$xxx (left)", value: "LEFT"},
    {label: "xxx$ (right)", value: "RIGHT"},
]

const onUpload = ({ files, setProgress, setIsSuccessUpload, resetDropzone }) => {

    uploadFile("admin/upload", files[0], {
        onUploadProgress: (e) => {
            setProgress(e.loaded / e.total * 100)
        }
    }).then((res) => {
        if (res.data && !res.data?.errors)
        {
            console.log(res.data)
            toast.success("Uploaded Successfully.")
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

export default function GeneralSettings()
{
    const { isLoading, isError, error, settings } = useDashboardSettings()
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            "SITE_NAME": "",
            "TIMEZONE": "",
            "CURRENCY": "",
            "CURRENCY_SYMBOL": "",
            "CURRENCY_POSITION": "",
            "HEAD_CODE": ""
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values)
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

    useEffect(useCallback(() => {
        if (Object.keys(settings).length) {
            formik.setValues(settings)
        }
    }), [settings])

    // formik.values.SITE_NAME == ""
    if (isLoading || !formik.values.SITE_NAME)
    {
        return <SectionLoading />
    }

    const defaultTimezone = { label: formik.values.TIMEZONE, value: formik.values.TIMEZONE }
    const defaultCurrencyPosition = { label: formik.values.CURRENCY_POSITION, value: formik.values.CURRENCY_POSITION }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-row-reverse gap-3 mb-4">
                    <SuperButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting} className="btn btn-primary">
                        <FontAwesomeIcon icon={faFloppyDisk} /> Save
                    </SuperButton>
                </div>

                <div className="mb-4">
                    <label htmlFor="sitename">Site Name:</label>
                    <input type="text" className="form-control" placeholder="" id="sitename" {...formik.getFieldProps("SITE_NAME")} />
                </div>
                <div className="row">
                    <div className="mb-4 col-md-6">
                        <label htmlFor="currency">Logo:</label>
                        <Dropzone onUpload={onUpload} onError={onError} />
                    </div>
                    <div className="mb-4 col-md-6">
                        <label htmlFor="currency_symbol">Favicon:</label>
                        <Dropzone onUpload={onUpload} onError={onError} />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-4 col-md-4 col-sm-12">
                        <label htmlFor="timezone">Timezone:</label>
                        <Select options={AVAILABLE_TIMEZONES_OPTIONS} defaultValue={defaultTimezone} id="timezone" onChange={(option) => formik.setFieldValue("TIMEZONE", option.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-4 col-md-4">
                        <label htmlFor="currency">Currency:</label>
                        <input type="text" className="form-control" placeholder="e.g. USD" id="currency" {...formik.getFieldProps("CURRENCY")} onChange={(e) => formik.setFieldValue("CURRENCY", e.target.value?.toUpperCase())} />
                    </div>
                    <div className="mb-4 col-md-4">
                        <label htmlFor="currency_symbol">Currency symbol:</label>
                        <input type="text" className="form-control" placeholder="e.g. $" id="currency_symbol" {...formik.getFieldProps("CURRENCY_SYMBOL")} />
                    </div>
                    <div className="mb-4 col-md-4">
                        <label htmlFor="currency_symbol_position">Currency symbol position:</label>
                        <Select options={CURRENCY_POSITIONS} isSearchable={false} defaultValue={defaultCurrencyPosition || CURRENCY_POSITIONS[0]} id="currency_symbol_position" onChange={(option) => formik.setFieldValue("CURRENCY_POSITION", option.value)} />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="head_code">Head Code:</label>
                    <textarea rows={7} className="form-control" placeholder="Accept Javascripts code snippets, and will be pleaced beteen <head> tag." id="head_code" {...formik.getFieldProps("HEAD_CODE")} ></textarea>
                </div>
            </form>
        </>
    )
}
