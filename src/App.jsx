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
import HotelDetail from "./pages/user/HotelDetail";
import Rooms from "./pages/user/Rooms";
import About from "./pages/user/About";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password" element={<Password />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="hotels" element={<AdminHotels />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* USER */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/hotels" element={<UserHotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* ROOT */}
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;