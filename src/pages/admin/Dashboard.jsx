import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [openAddOwner, setOpenAddOwner] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menuRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Phúc Duy",
    role: "Admin",
  };

  const [ownerForm, setOwnerForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const loadHotels = () => {
    api.get("/api/hotels").then((res) => setHotels(res.data));
  };

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const formatDateVN = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
  };

  const handleDelete = (id) => {
    if (!window.confirm("Xóa khách sạn này?")) return;
    api.delete(`/api/hotels/${id}`).then(loadHotels);
  };

  const handleEdit = (hotel) => {
    const name = prompt("Tên khách sạn:", hotel.hotel_name);
    const rating = prompt("Đánh giá (1-5):", hotel.rating);
    if (!name || !rating) return;

    api.put(`/api/hotels/${hotel.id}`, { name, rating }).then(loadHotels);
  };

  const handleAddOwner = async () => {
    const { name, email, phone, password } = ownerForm;
    if (!name || !email || !phone || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    await api.post("/register", ownerForm);
    setOpenAddOwner(false);
    setOwnerForm({ name: "", email: "", phone: "", password: "" });
    loadHotels();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h3>Xin chào, {currentUser.name}</h3>
          <p>Chúc 1 ngày tốt lành</p>
        </div>

        <div className="user-info" ref={menuRef}>
          <span className="bell">🔔</span>
          <span className="divider"></span>

          <img
            className="avatar"
            src="/public/71dbf3f6-ac1b-4262-9312-3016b8c754fc.jpg"
            alt="avatar"
            onClick={() => setOpenUserMenu(!openUserMenu)}
          />

          <div
            className="user-text"
            onClick={() => setOpenUserMenu(!openUserMenu)}
          >
            <strong>{currentUser.name}</strong>
            <p>{currentUser.role}</p>
          </div>

          <span
            className="caret"
            onClick={() => setOpenUserMenu(!openUserMenu)}
          >
            ▾
          </span>

          {openUserMenu && (
            <div className="user-dropdown">
              <button className="dropdown-item" onClick={handleLogout}>
                🚪 Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-toolbar">
        <input placeholder="🔍 Tìm kiếm" />

        <button className="btn-primary" onClick={() => setOpenAddOwner(true)}>
          Thêm chủ sở hữu +
        </button>
      </div>

      {openAddOwner && (
        <div className="modal-overlay" onClick={() => setOpenAddOwner(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm chủ sở hữu</h3>

            <input
              placeholder="Họ tên"
              value={ownerForm.name}
              onChange={(e) =>
                setOwnerForm({ ...ownerForm, name: e.target.value })
              }
            />
            <input
              placeholder="Email"
              value={ownerForm.email}
              onChange={(e) =>
                setOwnerForm({ ...ownerForm, email: e.target.value })
              }
            />
            <input
              placeholder="Số điện thoại"
              value={ownerForm.phone}
              onChange={(e) =>
                setOwnerForm({ ...ownerForm, phone: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={ownerForm.password}
              onChange={(e) =>
                setOwnerForm({ ...ownerForm, password: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setOpenAddOwner(false)}>Hủy</button>
              <button onClick={handleAddOwner}>Lưu</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-card">
        <h4>Danh sách khách sạn</h4>

        <table>
          <thead>
            <tr>
              <th>Chủ KS</th>
              <th>Tên KS</th>
              <th>Ngày đăng ký</th>
              <th>Đánh giá</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {hotels.map((h) => (
              <tr key={h.id}>
                <td>
                  <strong>{h.owner_name}</strong>
                  <p>{h.owner_email}</p>
                </td>
                <td>{h.hotel_name}</td>
                <td>{formatDateVN(h.created_at)}</td>
                <td>{"★".repeat(h.rating)}</td>
                <td>
                  <button onClick={() => handleEdit(h)}>✎</button>
                  <button onClick={() => handleDelete(h.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;