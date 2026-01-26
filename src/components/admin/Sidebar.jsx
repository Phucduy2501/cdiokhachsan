import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">BookStay.</h2>

      <nav className="menu">
        <NavLink to="/admin" end className="menu-item">
          <span className="icon">⌘</span>
          <span>Bảng Điều Khiển</span>
        </NavLink>

        <NavLink to="/admin/users" className="menu-item">
          <span className="icon">📊</span>
          <span>Người dùng</span>
        </NavLink>

        <NavLink to="/admin/hotels" className="menu-item">
          <span className="icon">📄</span>
          <span>Chủ Khách Sạn</span>
        </NavLink>

        <NavLink to="/admin/bookings" className="menu-item">
          <span className="icon">🗂</span>
          <span>Thông Tin Đặt Phòng</span>
        </NavLink>

        <NavLink to="/admin/refund" className="menu-item">
          <span className="icon">💰</span>
          <span>Đền bù</span>
        </NavLink>

        <NavLink to="/admin/consult" className="menu-item">
          <span className="icon">💬</span>
          <span>Tư vấn</span>
        </NavLink>

        <NavLink to="/admin/support" className="menu-item">
          <span className="icon">❓</span>
          <span>Hỗ trợ</span>
        </NavLink>

        <NavLink to="/admin/settings" className="menu-item">
          <span className="icon">⚙</span>
          <span>Cài đặt</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
