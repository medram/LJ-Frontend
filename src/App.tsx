import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// loading CSS style
import "@assets/scss/main.scss";
import 'react-toastify/dist/ReactToastify.css';

// loading bootstrap js files.
import "bootstrap/dist/js/bootstrap";


import CheckoutPage from "@pages/CheckoutPage";
import ContactPage from "@pages/ContactPage";
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import LogoutPage from "@pages/LogoutPage";
import NotFoundPage from "@pages/NotFoundPage";
import PagePage from "@pages/PagePage";
import PricingPage from "@pages/PricingPage";
import RegisterPage from "@pages/RegisterPage";
import ResetPasswordPage from "@pages/ResetPasswordPage";
import ThankYouPage from "@pages/ThankYouPage";
import AccountPage from "@pages/account/AccountPage";
import AccountDetailsPage from "@pages/account/settings/AccountDetailsPage";
import ChangePasswordPage from "@pages/account/settings/ChangePasswordPage";
import InvoicesPage from "@pages/account/settings/InvoicesPage";
import MySubscriptionPage from "@pages/account/settings/MySubscribtionPage";
import AISettingsPage from "@pages/admin/AISettingsPage";
import APIKeysPage from "@pages/admin/APIKeysPage";
import AddCustomerPage from "@pages/admin/AddCustomerPage";
import AddPagePage from "@pages/admin/AddPagePage";
import AdminDashboardPage from "@pages/admin/AdminDashboardPage";
import CustomersPage from "@pages/admin/CustomersPage";
import EditCustomerPage from "@pages/admin/EditCustomerPage";
import EditPagePage from "@pages/admin/EditPagePage";
import LCPage from "@pages/admin/LCPage";
import { PagesPage } from "@pages/admin/PagesPage";
import PaymentMethodsPage from "@pages/admin/PaymentMethodsPage";
import PlansPage from "@pages/admin/PlansPage";
import { SettingsPage } from "@pages/admin/SettingsPage";
import { SubscriptionsPage } from "@pages/admin/SubscriptionsPage";
import AccountSettingsLayout from "@pages/layouts/AccountSettingsLayout";
import ELRequired from "@pages/middlewares/ELRequired";
import NoAuthRequired from "@pages/middlewares/NoAuthRequired";
import UserRequired from "@pages/middlewares/UserRequired";
import CookiesAlert from "./components/CookiesAlert";
import BasePage from "./pages/layouts/BasePage";


// Lazy loading
const AdminDashboardLayout = lazy(() => import("@pages/layouts/AdminDashboardLayout"))
const AccountLayout = lazy(() => import("@pages/layouts/AccountLayout"))
const PlaygroundPage = lazy(() => import("@pages/PlaygroundPage"))


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/p/:slug" element={<BasePage><PagePage /></BasePage>} />
        <Route path="/logout" element={<LogoutPage />} />

        <Route element={<ELRequired to="/" />}>
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        <Route element={<NoAuthRequired />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset/:token" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<UserRequired />}>
          <Route path="/playground/:uuid?" element={<PlaygroundPage />} />

          <Route element={<ELRequired to="/account" />}>
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Route>
        </Route>

        <Route path="/account" element={<AccountLayout />}>
          <Route path="" element={<AccountPage />}></Route>

          <Route element={<ELRequired to="/account" />}>
            <Route path="settings" element={<AccountSettingsLayout />}>
              <Route path="subscription" element={<MySubscriptionPage />} />
              <Route path="invoices" element={<InvoicesPage />} />
            </Route>
          </Route>

          <Route path="settings" element={<AccountSettingsLayout />}>
            <Route path="" element={<AccountDetailsPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
          </Route>
        </Route>

        <Route path="/admin/license" element={<LCPage />} />

        <Route path="/admin" element={<AdminDashboardLayout />}>

          <Route path="" element={<AdminDashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/add" element={<AddCustomerPage />} />
          <Route path="customers/edit/:id" element={<EditCustomerPage />} />

          <Route element={<ELRequired />} >
            <Route path="plans" element={<PlansPage />} />
            <Route path="payment-gateways" element={<PaymentMethodsPage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
          </Route>

          <Route path="pages" element={<PagesPage />} />
          <Route path="pages/add" element={<AddPagePage />} />
          <Route path="pages/edit/:id" element={<EditPagePage />} />


          <Route path="ai-settings" element={<AISettingsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="api-keys" element={<APIKeysPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <CookiesAlert />
      <ToastContainer position="top-center" hideProgressBar={true} draggable={false} theme="colored" />
    </BrowserRouter>
  );
}

export default App;
