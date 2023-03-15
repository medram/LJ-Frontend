import { useState } from "react";
import { Outlet } from "react-router-dom";

import "../../assets/scss/dashboard.scss"
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";


export default function DashboardLayout() {
    const [showSidebar, toggleSidebar] = useState(false);

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <Navbar sidebarStatus={showSidebar} toggleSidebar={toggleSidebar} onClickBars={() => toggleSidebar(show => !show)} />
            </header>
            <Sidebar show={showSidebar} />
            <main className="dashboard-container">
                <div className="dashboard-content">
                    {<Outlet />}
                </div>
                <footer>&copy; All rights reserved.</footer>
            </main>
        </div>
    )
}
