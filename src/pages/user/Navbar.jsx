import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="homeNavbar">
      <div className="homeContainer navWrap">
        <NavLink to="/" className="brand">BookStay</NavLink>

        <nav className="navLinks">
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/hotels">Khách sạn</NavLink>
          <NavLink to="/rooms">Phòng</NavLink>
          <NavLink to="/about">Giới thiệu</NavLink>
        </nav>

        <div className="navActions">
          {!user ? (
            <>
              <NavLink to="/login" className="btn btnGhost">Login</NavLink>
              <NavLink to="/register" className="btn btnPrimary">Sign up</NavLink>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 600 }}>
                Xin chào, {user.name}
              </span>
              <button className="btn btnGhost" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}