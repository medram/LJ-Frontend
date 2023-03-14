import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

// loading CSS style
import "./assets/scss/main.scss"
// loading bootstrap js files.
import "bootstrap/dist/js/bootstrap"


import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboardLayout from "./pages/layouts/AdminDashboardLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route path="" element={<AdminDashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
