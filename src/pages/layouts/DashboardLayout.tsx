import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import SectionSuspense from "@/components/SectionSuspense";
import "@assets/scss/dashboard.scss";
import Navbar from "@components/dashboard/Navbar";
import Sidebar from "@components/dashboard/Sidebar";


export default function DashboardLayout() {
    const [showSidebar, toggleSidebar] = useState(false);
    const location = useLocation()

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <Navbar sidebarStatus={showSidebar} toggleSidebar={toggleSidebar} onClickBars={() => toggleSidebar(show => !show)} />
            </header>
            <Sidebar show={showSidebar} />
            <main className="dashboard-container">
                <SectionErrorBoundary key={location.pathname}>
                    <SectionSuspense>
                        <div className="dashboard-content">
                            {<Outlet />}
                        </div>
                    </SectionSuspense>
                </SectionErrorBoundary>
                <footer>&copy; All rights reserved.</footer>
            </main>
        </div>
    )
}
