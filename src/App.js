import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {
  // return <Dashboard />;

  return (
    <Routes>
      {/* <Route exact path="/" element={<AuthRoute user={user} />}> */}
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/settings" element={<Settings />} />
      {/* </Route> */}
      {/* <Route exact path="/login" element={<Login />} /> */}
      {/* <Route exact path="/register" element={<Register />} /> */}
      {/* <Route exact path="/playable" element={<Playable />} /> */}
    </Routes>
  );
}

export default App;
