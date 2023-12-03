import * as cc from "currency-codes"
import { toast } from "react-toastify";


export const VALID_DOCUMENT_TYPES = [
    { ext: "pdf",   mimetype: "application/pdf" },
    { ext: "csv",   mimetype: "text/csv" },
    // { ext: "doc",   mimetype: "application/msword" },
    // { ext: "xls",   mimetype: "application/vnd.ms-excel" },
    // { ext: "ppt",   mimetype: "application/vnd.ms-powerpoint" },
    { ext: "docx",  mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { ext: "xlsx",  mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { ext: "txt",   mimetype: "text/plain" },
    { ext: "json",  mimetype: "application/json" },
    { ext: "pptx",  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
    { ext: "epub",  mimetype: "application/epub+zip" },
]

export function getAvailableDocumentTypes()
{
    const types = {}
    VALID_DOCUMENT_TYPES.map((type) => {
        types[type.mimetype] = [`.${type.ext}`]
    })

    return types
}

export function getAvailableDocumentTypesString()
{
    return VALID_DOCUMENT_TYPES.map(type => type.ext).join(", ")
}

export function toastFormikErrors(errors)
{
    if (Object.keys(errors).length)
    {
        toast.error(Object.values(errors).slice(0, 1).pop())
    }
}

export function getAvailableTimezones()
{
    return (["UTC"]).concat(Intl.supportedValuesOf('timeZone'));
}

export const AVAILABLE_TIMEZONES_OPTIONS = getAvailableTimezones().map(timezone => ({label: timezone, value: timezone}))


export function datetimeFormat(datetime)
{
    return new Date(datetime).toLocaleString()
}

export function currencyList()
{
    return cc.codes()
}

export const CURRENCY_OPTIONS = currencyList().map(code => ({ label: code, value: code }))

export function isEmpty(obj)
{
    return Object.keys(obj).length === 0;
}

export function getRandomItem(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

