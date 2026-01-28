import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/register/register";
import Password from "./pages/password/password";


import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Hotels from "./pages/admin/Hotels";
import Bookings from "./pages/admin/Bookings";
import Users from "./pages/admin/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password" element={<Password />} />


       {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="/admin/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
