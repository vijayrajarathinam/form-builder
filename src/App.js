import React from "react";
import { auth } from "./firebase";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/settings";
import Dashboard from "./components/commons/Dashboard";
import OnboardingListPage from "./pages/settings/OnboardingListPage";
import OnboardingDetailPage from "./pages/settings/OnboardingDetailPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const AuthRoute = ({ user }) => {
  return user ? <Outlet user={user} /> : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = React.useState({});
  onAuthStateChanged(auth, setUser);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route exact path="/" element={<AuthRoute user={user} />}>
          <Route exact path="/" element={<DashboardPage />} />
          <Route exact path="/profile" element={<Dashboard content={ProfilePage} />} />
          <Route exact path="/settings" element={<Dashboard content={SettingsPage} />} />
          <Route exact path="/settings/formbuilder" element={<Dashboard content={OnboardingListPage} />} />
          <Route path="/settings/formbuilder/:formId" element={<Dashboard content={OnboardingDetailPage} />} />
        </Route>
        <Route path="/register/:formId" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar />
    </AnimatePresence>
  );
}

export default App;
