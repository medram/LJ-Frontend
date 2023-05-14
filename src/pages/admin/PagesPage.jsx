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


export function PagesPage()
{
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


    if (isLoading) {
        return <SectionLoading />
    }

    if (isError) {
        return toast.error(error.message)
    }

    return (
        <>
            <h1 className="mb-3">Pages</h1>
            <div className="d-flex flex-row-reverse gap-3 mb-4">
                <Link to="add" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Page</Link>
            </div>

            <div className="row">
                <div className="col-12">
                    <section className="bg-light rounded p-4">
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Slug</th>
                                    <th>Published</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages?.map((page, i) => {
                                    return <tr key={i}>
                                        <td>{page.title}</td>
                                        <td><code>{page.slug}</code></td>
                                        <td>{page.status ? (
                                            <span className="badge text-bg-success">Yes</span>
                                        ) : (
                                            <span className="badge text-bg-warning">No</span>
                                        )}</td>
                                        <td>{datetimeFormat(page.created_at)}</td>
                                        <td>
                                            <Link to={`edit/${page.id}`} className="btn btn-primary btn-sm  mx-1 mb-1"><FontAwesomeIcon icon={faPen} /></Link>

                                            <button onClick={() => handleDelete(page.id)} className="btn btn-danger btn-sm mx-1 mb-1"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </>
    )
}
