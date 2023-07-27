import { useQuery } from "react-query"
import { currentSubscription, getChatRoom, getUserChatRoomList, getUserInvoices } from "../api/account"


export function useCurrentSubscription()
{
    const { data, ...rest } = useQuery("user.subscription", currentSubscription, {
        // staleTime: Infinity
        retry: 1
    })

    return { ...rest, subscription: data?.subscription }
}


export function useUserInvoices()
{
    const { data, ...rest } = useQuery("user.invoices", getUserInvoices, { staleTime: Infinity })

    return { ...rest, invoices: data?.invoices }
}


export function useUserChatRoomList()
{
    const { data, ...rest } = useQuery("user.chat.list", getUserChatRoomList, {
        //staleTime: Infinity
    })

    return { ...rest, userChatRoomList: data?.chats }
}


export default function useChatRoom(uuid)
{
    const {data, ...rest} = useQuery(`user.chat.${uuid}`, () => getChatRoom(uuid), {
        staleTime: Infinity
    })

    return { ...rest, chat: data?.chat }
}
