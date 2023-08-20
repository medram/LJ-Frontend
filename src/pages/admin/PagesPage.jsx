import { toast } from "react-toastify"
import SectionLoading from "../../components/SectionLoading"
import { usePages } from "../../hooks/admin"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { deletePage } from "../../api/admin"
import Swal from "sweetalert2"
import { useQueryClient } from "react-query"
import { datetimeFormat } from "../../utils"
import { useDemo } from "../../hooks"
import { useMemo } from "react"
import AdvancedDataTable from "../../components/AdvancedDataTable"


export function PagesPage()
{
    const { isDemo } = useDemo()
    const { isLoading, isError, error, pages } = usePages()
    const queryClient = useQueryClient()

    const handleDelete = (id) => {
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
            selector: page => page.title
        },
        {
            name: "Slug",
            sortable: true,
            sortFunction: (page1, page2) => page1.slug > page2.slug,
            selector: page => <code>{page.slug}</code>
        },
        {
            name: "Published",
            selector: page => (
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
            selector: page => datetimeFormat(page.created_at)
        },
        {
            name: "Actions",
            selector: page => (
                <>
                    <Link to={`edit/${page.id}`} className="btn btn-primary btn-sm  mx-1 mb-1"><FontAwesomeIcon icon={faPen} /></Link>

                    <button onClick={() => handleDelete(page.id)} className="btn btn-danger btn-sm mx-1 mb-1"><FontAwesomeIcon icon={faTrash} /></button>
                </>
            )
        },
    ], [])

    if (isLoading) {
        return <SectionLoading />
    }

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
                            searchFunction={(page, searchQuery) => [page.title.toLowerCase(), page.slug.toLowerCase()].includes(searchQuery)}
                        />
                    </section>
                </div>
            </div>
        </>
    )
}
