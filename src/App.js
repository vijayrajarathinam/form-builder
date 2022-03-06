import React from "react";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Settings from "./pages/Settings";
import Dashboard from "./components/commons/Dashboard";
import OnboardingListPage from "./pages/settings/OnboardingListPage";
import OnboardingDetailPage from "./pages/settings/OnboardingDetailPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        {/* <Route exact path="/" element={<AuthRoute user={user} />}> */}
        <Route exact path="/" element={<DashboardPage />} />
        <Route exact path="/settings" element={<Settings />} />
        {/* </Route> */}
        <Route exact path="/settings/formbuilder" element={<Dashboard content={OnboardingListPage} />} />
        <Route path="/settings/formbuilder/:formId" element={<Dashboard content={OnboardingDetailPage} />} />

        {/* <Route exact path="/login" element={<Login />} /> */}
        {/* <Route exact path="/register" element={<Register />} /> */}
        {/* <Route exact path="/playable" element={<Playable />} /> */}
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar />
    </AnimatePresence>
  );
}

export default App;
