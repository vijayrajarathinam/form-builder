import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // return <Dashboard />;

  toast("Wow so easy!");
  toast.success("Course Deleted!...");

  return (
    <React.Fragment>
      <Routes>
        {/* <Route exact path="/" element={<AuthRoute user={user} />}> */}
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/settings" element={<Settings />} />
        {/* </Route> */}
        {/* <Route exact path="/login" element={<Login />} /> */}
        {/* <Route exact path="/register" element={<Register />} /> */}
        {/* <Route exact path="/playable" element={<Playable />} /> */}
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar />
    </React.Fragment>
  );
}

export default App;
