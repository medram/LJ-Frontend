import AIMessage from "@/components/playground/AIMessage"
import UserMessage from "@/components/playground/UserMessage"
import { ReactElement } from "react"

export type PluginType = {
	name: string,
	desc: string,
	beta: boolean
}

export type SelectedPluginType = {
	name: string,
}

export type GeneralSettingsType = {
	SITE_NAME: string,
	TIMEZONE: string,
	CURRENCY: string,
	CURRENCY_SYMBOL: string,
	CURRENCY_POSITION: string,
	HEAD_CODE: string,
	SITE_LOGO: string,
	SITE_FAVICON: string,
	SHOW_LOGO: boolean,
	EMAIL_TEMPLATE_REGISTRATION: string,
	EMAIL_TEMPLATE_PASSWORD_RESET: string,
	EMAIL_TEMPLATE_SUBSCRIPTION_SUCCESSFULL: string,
	EMAIL_TEMPLATE_SUBSCRIBTION_EXPIRED: string,
	EMAIL_TEMPLATE_SUBSCRIPTION_RENEWED: string,
	PM_PAYPAL_SANDBOX: boolean,
	PM_PAYPAL_STATUS: boolean,
	PM_STRIP_SANDBOX: boolean,
	PM_STRIP_STATUS: boolean,
	SITE_DESC: string,
	SITE_KEYWORDS: string,
	PM_PAYPAL_PRODUCT_ID: string,
	TRIAL_PLANS: number,
	CHAT_AGENT_MODEL: string,
	CHAT_TOOLS_MODEL: string,
	CHAT_AGENT_MODEL_TEMP: string,
	CHAT_TOOLS_MODEL_TEMP: string,
	CHAT_PLANNER_AGENT_MODEL: string,
	CHAT_PLANNER_AGENT_MODEL_TEMP: number,
	CHAT_AVAILABLE_PLUGINS: PluginType[],
	SELECTED_PLUGINS: SelectedPluginType[],
	TRIAL_DAYS: number,
	APP_VERSION: string,
}

export type SecretSettingsType = GeneralSettingsType & {
	SMTP_FROM: string,
	SMTP_HOST: string,
	SMTP_PORT: number,
	SMTP_USER: string,
	SMTP_PASSWORD: string,
	SMTP_MAIL_ENCRIPTION: "ssl" | "tls",
	SMTP_ALLOW_INSECURE_MODE: boolean,
	PM_PAYPAL_CLIENT_ID: string,
	PM_PAYPAL_CLIENT_SECRET: string,
	RAPID_API_KEY: string,
	RAPID_API_HOST: string,
	OPENAI_API_KEY: string,
	PM_PAYPAL_WEBHOOK_ID: string,
	PM_STRIP_PUBLIC_KEY: string,
	PM_STRIP_PRIVATE_KEY: string,
	PM_STRIP_SECRET_KEY: string,
	PM_STRIP_SECRET_KEY_TEST: string,
	PM_STRIP_PRODUCT_ID: string,
	PM_STRIP_WEBHOOK_ID: string,
}

export type SettingsType = GeneralSettingsType | SecretSettingsType

export type UserType = {
	id: number,
	username: string,
	email: string,
	avatar: string,
	is_active: boolean,
	role: number,
	email_verified_at: string,
	updated_at: string,
	created_at: string,
	[key: string]: unknown
}

export type CustomerType = {
	id: number,
	username: string,
	email: string,
	avatar: string,
	role: number,
	is_active: boolean
	email_verified_at: string,
	created_at: string,
	updated_at: string,
}

export type PlanType = {
	id: number,
	name: string,
	description: string,
	price: number,
	features: string,
	status: number,
	is_free: boolean,
	is_popular: boolean,
	billing_cycle: "monthly" | "yearly",
	pdfs: number,
	questions: number,
	pdf_size: number,
	pdf_pages: number,
	paypal_plan_id: string,
	stripe_plan_id: string,
	soft_delete: number,
	created_at: string,
	updated_at: string,
	[key: string]: unknown
}

export type SubscriptionType = {
	id: number,
	sub_id: string,
	user_id: number,
	user_email: string,
	user_username: string,
	plan_id: number,
	status: number,
	plan_name: string,
	is_free: boolean,
	payment_gateway: "STRIPE" | "PAYPAL",
	gateway_plan_id: string,
	gateway_subscription_id: string,
	pdfs: number,
	questions: number,
	pdf_size: number,
	pdf_pages: number,
	price: number,
	billing_cycle: "monthly" | "yearly",
	expiring_at: string,
	created_at: string,
	updated_at: string,
	[key: string]: unknown
}

export type PageType = {
	id: number,
	title: string,
	slug: string,
	content: string,
	status: number,
	created_at: string,
	updated_at: string
}

export type ChatRoomType = {
	id: number,
	user_id: number,
	uuid: string,
	title: string,
	path: string | null,
	created_at: string,
	updated_at: string,
	chat_history: ChatMessageType[], // has to be parset to ChatMessageType[]
	[rest: string]: any
}

export type ChatMessageType = {
	type: "human" | "ai",
	content: string
}

// This type needs to be fixed/improved to accept only AIMessage or UserMessage
export type ChatMessage = ReactElement<any, typeof AIMessage> | ReactElement<any, typeof UserMessage>

