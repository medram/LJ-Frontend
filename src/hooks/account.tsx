import { ChatRoomType, SubscriptionType } from "@/utils/types"
import { useQuery } from "react-query"
import { currentSubscription, getChatRoom, getUserChatRoomList, getUserInvoices } from "../api/account"


export function useCurrentSubscription({ suspense=true }: { suspense?: boolean })
{
    const { data, ...rest } = useQuery("user.subscription", currentSubscription, {
        // staleTime: Infinity
        retry: 1,
        suspense
    })

    const subscription: SubscriptionType | null = data?.subscription || null

    return { ...rest, subscription }
}


export function useUserInvoices()
{
    const { data, ...rest } = useQuery("user.invoices", getUserInvoices, { staleTime: Infinity, suspense: true })

    return { ...rest, invoices: data?.invoices }
}


export function useUserChatRoomList()
{
    const { data, ...rest } = useQuery("user.chat.list", getUserChatRoomList, {
        //staleTime: Infinity,
        suspense: true
    })

    const userChatRoomList: ChatRoomType[] = data?.chats || []

    return { ...rest, userChatRoomList }
}


export default function useChatRoom(uuid: string)
{
    const {data, ...rest} = useQuery(`user.chat.${uuid}`, () => getChatRoom(uuid), {
        staleTime: Infinity,
        suspense: true
    })

    const _chat = data?.chat

    if (_chat && typeof _chat.chat_history === "string")
    {
        try {
            _chat.chat_history = _chat.chat_history ? JSON.parse(_chat.chat_history) : []
        } catch (err){
            console.log("Error JSON Parsing", err)
        }
    }

    const chat: ChatRoomType | null = _chat || null

    return { ...rest, chat }
}
