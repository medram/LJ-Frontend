import * as cc from "currency-codes";
import { toast } from "react-toastify";

export const AVAILABLE_AI_CHAT_MODELS = [
  // Google AI Models
  { label: "gemini-2.0-flash", value: "gemini-2.0-flash" },
  {
    label: "gemini-2.0-flash-lite-preview-02-05",
    value: "gemini-2.0-flash-lite-preview-02-05",
  },
  { label: "gemini-1.5-flash", value: "gemini-1.5-flash" },
  { label: "gemini-1.5-flash-8b", value: "gemini-1.5-flash-8b" },
  { label: "gemini-1.5-pro", value: "gemini-1.5-pro" },
  // OpenAI Models
  { label: "gpt-4o", value: "gpt-4o" },
  { label: "gpt-4o-mini", value: "gpt-4o-mini" },
  { label: "gpt-4.1", value: "gpt-4.1" },
  { label: "gpt-4", value: "gpt-4" },
  { label: "gpt-4-turbo", value: "gpt-4-turbo" },
  { label: "gpt-3.5-turbo", value: "gpt-3.5-turbo" },
] as const;

export const AVAILABLE_AI_MODELS = [...AVAILABLE_AI_CHAT_MODELS] as const;

export const GOOGLE_AI_MODELS = [
  { label: "gemini-2.0-flash", value: "gemini-2.0-flash" },
  {
    label: "gemini-2.0-flash-lite-preview-02-05",
    value: "gemini-2.0-flash-lite-preview-02-05",
  },
  { label: "gemini-1.5-flash", value: "gemini-1.5-flash" },
  { label: "gemini-1.5-flash-8b", value: "gemini-1.5-flash-8b" },
  { label: "gemini-1.5-pro", value: "gemini-1.5-pro" },
] as const;

export const VALID_DOCUMENT_TYPES = [
  { ext: "pdf", mimetype: "application/pdf" },
  { ext: "csv", mimetype: "text/csv" },
  {
    ext: "docx",
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    ext: "xlsx",
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  { ext: "txt", mimetype: "text/plain" },
  { ext: "json", mimetype: "application/json" },
  {
    ext: "pptx",
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  { ext: "epub", mimetype: "application/epub+zip" },
] as const;

export const DEMO_SUBSCRIPTION = {
  pdfs: 4,
  questions: 20,
  created_at: new Date().getTime(),
};

export const DEMO_SUBSCRIPTION_EXPIRE = 12; // in Hours

export function getAvailableDocumentTypes() {
  const types = {};
  VALID_DOCUMENT_TYPES.map((type) => {
    types[type.mimetype] = [`.${type.ext}`];
  });

  return types;
}

export function getAvailableDocumentTypesString() {
  return VALID_DOCUMENT_TYPES.map((type) => type.ext).join(", ");
}

export function toastFormikErrors(errors: any[]) {
  if (Object.keys(errors).length) {
    toast.error(Object.values(errors).slice(0, 1).pop());
  }
}

export function getAvailableTimezones() {
  return ["UTC"].concat(Intl.supportedValuesOf("timeZone"));
}

export const AVAILABLE_TIMEZONES_OPTIONS = getAvailableTimezones().map(
  (timezone) => ({ label: timezone, value: timezone })
);

export function datetimeFormat(datetime: string) {
  return new Date(datetime).toLocaleString();
}

export function currencyList() {
  return cc.codes();
}

export const CURRENCY_OPTIONS = currencyList().map((code) => ({
  label: code,
  value: code,
}));

export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export function getRandomItem(list: any[]) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
