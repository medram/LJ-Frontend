import MyDataTable from "./MyDataTable";
import { useCallback, useEffect, useState } from "react";


export default function AdvancedDataTable({
    data = [],
    enableSearch = true,
    subHeaderComponent,
    searchFunction = (item) => true,
    ...rest})
{
    const [searchQuery, setSearchQuery] = useState("")
    const [dataList, setDataList] = useState([])

    // Perform searchQuery
    useEffect(useCallback(() => {
        if (searchQuery.length)
        {
            setDataList(data?.filter((item) => searchFunction(item, searchQuery)))
        }
        else
        {
            setDataList(data)
        }
    }, [searchQuery]), [searchQuery])

    // Sync Data with dataList
    useEffect(useCallback(() => {
        if (data)
        {
            setDataList(data)
        }
    }, [data]), [data])


    return <MyDataTable
        data={dataList}
        pagination
        subHeader
        subHeaderComponent={(

            <div className="d-flex flex-row-reverse gap-3 mb-4">
                {subHeaderComponent}

                {enableSearch && (
                    <div className="col">
                        <input type="text" className="form-control w-50-md w-100 float-end" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                    </div>
                )}
            </div>
        )}

        {...rest}
    />
}
