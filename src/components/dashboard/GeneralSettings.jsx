import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Select from "react-select"
import { AVAILABLE_TIMEZONES_OPTIONS } from "../../utils";
import Dropzone from "../Dropzone"
import axiosApi from "../../api/axiosApi";
import { uploadFile } from "../../api";
import { toast } from "react-toastify";


const CURRENCY_POSITION = [
    {label: "$xxx (left)", value: "LEFT"},
    {label: "xxx$ (right)", value: "RIGHT"},
]

const onUpload = ({ files, setProgress, setIsSuccessUpload, resetDropzone }) => {

    uploadFile("admin/upload", files[0], {
        onUploadProgress: (e) => {
            setProgress(e.loaded / e.total * 100)
        }
    }).then(() => {
        toast.success("Uploaded Successfully.")
        setIsSuccessUpload(true)
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

    return (
        <>
            <div className="d-flex flex-row-reverse gap-3 mb-4">
                <Link to="add" className="btn btn-primary"><FontAwesomeIcon icon={faFloppyDisk} /> Save</Link>
            </div>
            <form>
                <div className="mb-4">
                    <label htmlFor="sitename">Site Name:</label>
                    <input type="text" className="form-control" placeholder="" id="sitename" />
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
                        <Select options={AVAILABLE_TIMEZONES_OPTIONS} defaultValue={AVAILABLE_TIMEZONES_OPTIONS[0]} id="timezone" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-4 col-md-4">
                        <label htmlFor="currency">Currency:</label>
                        <input type="text" className="form-control" placeholder="e.g. USD" id="currency" />
                    </div>
                    <div className="mb-4 col-md-4">
                        <label htmlFor="currency_symbol">Currency symbol:</label>
                        <input type="text" className="form-control" placeholder="e.g. $" id="currency_symbol" />
                    </div>
                    <div className="mb-4 col-md-4">
                        <label htmlFor="currency_symbol_position">Currency symbol position:</label>
                        <Select options={CURRENCY_POSITION} isSearchable={false} defaultValue={CURRENCY_POSITION[0]} id="currency_symbol_position" />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="head_code">Head Code:</label>
                    <textarea rows={7} className="form-control" placeholder="Accept Javascripts code snippets, and will be pleaced beteen <head> tag." id="head_code" />
                </div>
            </form>
        </>
    )
}
