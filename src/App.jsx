import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/register/register";
import Password from "./pages/password/password";

import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/admin/Dashboard";
import AdminHotels from "./pages/admin/Hotels";
import Bookings from "./pages/admin/Bookings";
import Users from "./pages/admin/Users";

import Home from "./pages/user/Home";
import UserHotels from "./pages/user/Hotels";
import Rooms from "./pages/user/Rooms";
import About from "./pages/user/About";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password" element={<Password />} />

      <Route
        path="/admin"
        element={
          user?.role === "admin" ? <AdminLayout /> : <Navigate to="/login" />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="hotels" element={<AdminHotels />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/hotels" element={<UserHotels />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route
        path="/"
        element={
          user
            ? user.role === "admin"
              ? <Navigate to="/admin" />
              : <Navigate to="/home" />
            : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;