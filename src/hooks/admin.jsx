import { useQuery } from "react-query";
import { getCustomers } from "../api/admin";


export function useCustomers()
{
    const {data, ...rest } = useQuery("admin.customers", getCustomers, {staleTime: Infinity})

    return { customers: data?.customers, ...rest}
}
