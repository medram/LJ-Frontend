import { PageType } from "@/utils/types"
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo } from "react"
import { useQueryClient } from "react-query"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { deletePage } from "../../api/admin"
import AdvancedDataTable from "../../components/AdvancedDataTable"
import { useDemo } from "../../hooks"
import { usePages } from "../../hooks/admin"
import { datetimeFormat } from "../../utils"


export function PagesPage()
{
    const { isDemo } = useDemo()
    const { isError, error, pages } = usePages()
    const queryClient = useQueryClient()

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Are you sure you want to delete this page?",
            icon: "warning",
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel!",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (isDemo)
                    return toast.success("This action isn't allowed on the demo mode!")

                deletePage(id).then(data => {
                    if (!data?.errors) {
                        queryClient.invalidateQueries("admin.pages")
                        toast.success(data?.message)
                    }
                    else {
                        toast.error(data?.message)
                    }
                }) // delete customer by ID
            }
        })
    }

    const columns = useMemo(() => [
        {
            name: "Title",
            sortable: true,
            selector: (page: PageType) => page.title
        },
        {
            name: "Slug",
            sortable: true,
            sortFunction: (page1: PageType, page2: PageType) => page1.slug > page2.slug,
            selector: (page: PageType) => <code>{page.slug}</code>
        },
        {
            name: "Published",
            selector: (page: PageType) => (
                page.status ? (
                    <span className="badge text-bg-success">Yes</span>
                ) : (
                    <span className="badge text-bg-warning">No</span>
                )
            )
        },
        {
            name: "Created",
            sortable: true,
            selector: (page: PageType) => datetimeFormat(page.created_at)
        },
        {
            name: "Actions",
            selector: (page: PageType) => (
                <>
                    <Link to={`edit/${page.id}`} className="btn btn-primary btn-sm  mx-1 mb-1"><FontAwesomeIcon icon={faPen} /></Link>

                    <button onClick={() => handleDelete(page.id)} className="btn btn-danger btn-sm mx-1 mb-1"><FontAwesomeIcon icon={faTrash} /></button>
                </>
            )
        },
    ], [])

    if (isError) {
        return toast.error(error.message)
    }

    return (
        <>
            <h1 className="mb-3">Pages</h1>

            <div className="row">
                <div className="col-12">
                    <section className="bg-light rounded p-4">

                        <AdvancedDataTable
                            columns={columns}
                            data={pages}
                            subHeaderComponent={(
                                <Link to="add" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Page</Link>
                            )}
                            searchFunction={(page: PageType, searchQuery: any) => [page.title.toLowerCase(), page.slug.toLowerCase()].includes(searchQuery)}
                        />
                    </section>
                </div>
            </div>
        </>
    )
}
