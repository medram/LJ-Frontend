import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify"

// loading CSS style
import 'react-toastify/dist/ReactToastify.css'
import "./assets/scss/main.scss"

// loading bootstrap js files.
import "bootstrap/dist/js/bootstrap"


import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboardLayout from "./pages/layouts/AdminDashboardLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NoAuthRequired from "./pages/middlewares/NoAuthRequired";
import CustomersPage from "./pages/admin/CustomersPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route element={<NoAuthRequired />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route path="" element={<AdminDashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer position="top-right" hideProgressBar={true} draggable={false} />
    </BrowserRouter>
  );
}

export default App;
