import { Outlet } from "react-router-dom";
import BasePage from "./BasePage";


export default function PlaygroundLayout()
{
    return (
        <BasePage showFooter={false}>
            <div className="row playground">
                <div className="col-3 col-lg-2 playground-sidebar">
                    Sidebar here:
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed corrupti aperiam ipsa qui aliquam voluptates quo ut. Nesciunt iure eligendi iusto quos eos mollitia, cumque quisquam optio, quis, delectus recusandae.
                </div>
                <div className="col-9 col-lg-10 playground-chat-section">
                    <Outlet />
                </div>
            </div>
        </BasePage>
    )
}
