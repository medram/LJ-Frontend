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


export function SubscriptionsPage() {

    return (
        <>
            <h1 className="mb-3">Subscriptions</h1>

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
                            </tbody>
                        </table>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, doloremque. Necessitatibus eum aut natus nobis dolore laudantium rem at error voluptatibus cumque sit, aspernatur repellat iure ex similique, voluptates quidem?
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}
