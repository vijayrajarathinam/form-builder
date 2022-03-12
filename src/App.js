import React from "react";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/settings";
import Dashboard from "./components/commons/Dashboard";
import OnboardingListPage from "./pages/settings/OnboardingListPage";
import OnboardingDetailPage from "./pages/settings/OnboardingDetailPage";
import RegisterPage from "./pages/RegisterPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route exact path="/" element={<AuthRoute user={user} />}> */}
        <Route exact path="/" element={<DashboardPage />} />
        <Route exact path="/settings" element={<Dashboard content={SettingsPage} />} />
        {/* </Route> */}
        <Route exact path="/settings/formbuilder" element={<Dashboard content={OnboardingListPage} />} />
        <Route path="/settings/formbuilder/:formId" element={<Dashboard content={OnboardingDetailPage} />} />

        <Route path="/register/:formId" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar />
    </AnimatePresence>
  );
}

export default App;
