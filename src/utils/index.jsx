import * as cc from "currency-codes"
import { toast } from "react-toastify";

export const AVAILABLE_AI_CHAT_MODELS = [
    { label: "gpt-3.5-turbo",           value: "gpt-3.5-turbo" },
    { label: "gpt-3.5-turbo-0301",      value: "gpt-3.5-turbo-0301" },
    { label: "gpt-3.5-turbo-0613",      value: "gpt-3.5-turbo-0613" },
    { label: "gpt-3.5-turbo-1106",      value: "gpt-3.5-turbo-1106" },
    { label: "gpt-3.5-turbo-16k",       value: "gpt-3.5-turbo-16k" },
    { label: "gpt-3.5-turbo-16k-0613",  value: "gpt-3.5-turbo-16k-0613" },
    { label: "gpt-4",                   value: "gpt-4" },
    { label: "gpt-4-0314",              value: "gpt-4-0314" },
    { label: "gpt-4-0613",              value: "gpt-4-0613" },
    { label: "gpt-4-1106-preview",      value: "gpt-4-1106-preview" },
]

export const AVAILABLE_AI_COMPLETE_MODELS = [
    { label: "text-davinci-003",        value: "text-davinci-003" },
    { label: "text-curie-001",          value: "text-curie-001" },
]

export const AVAILABLE_AI_MODELS = [
    ...AVAILABLE_AI_COMPLETE_MODELS,
    ...AVAILABLE_AI_CHAT_MODELS,
]

export const VALID_DOCUMENT_TYPES = [
    { ext: "pdf",   mimetype: "application/pdf" },
    { ext: "csv",   mimetype: "text/csv" },
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

