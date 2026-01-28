import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);

  const loadHotels = () => {
    api.get("/api/hotels").then((res) => setHotels(res.data));
  };

  useEffect(() => {
    loadHotels();
  }, []);

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
  const [openAddOwner, setOpenAddOwner] = useState(false);

  const [ownerForm, setOwnerForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleAddOwner = async () => {
    try {
      const { name, email, phone, password } = ownerForm;

      if (!name || !email || !phone || !password) {
        alert("Vui lòng nhập đầy đủ thông tin chủ sở hữu!");
        return;
      }

      const res = await api.post("/register", ownerForm);

      alert(res.data.message);

      if (res.data.success) {
        setOpenAddOwner(false);
        setOwnerForm({ name: "", email: "", phone: "", password: "" });
        loadHotels(); // reload bảng
      }
    } catch (err) {
      console.log(err);
      alert("Lỗi thêm chủ sở hữu!");
    }
  };


  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h3>Xin Chào, Phúc Duy</h3>
          <p>Chúc 1 ngày tốt lành</p>
        </div>

        <div className="user-info">
          <span className="bell">🔔</span>

          <span className="divider"></span>

          <img className="avatar" src="/public/71dbf3f6-ac1b-4262-9312-3016b8c754fc.jpg" alt="avatar" />

          <div className="user-text">
            <strong>Phúc Duy</strong>
            <p>Admin</p>
          </div>

          <span className="caret">▾</span>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="dashboard-toolbar">
        <div className="toolbar-left">
          <input placeholder="🔍 Tìm kiếm" />
        </div>

        <div className="toolbar-right">
          <button className="btn-primary" onClick={() => setOpenAddOwner(true)}>
            Thêm chủ sở hữu <span className="plus">+</span>
          </button>


          <div className="toolbar-options">
            <div className="dropdown">
              Sắp xếp theo <span className="arrow">▼</span>
            </div>

            <div className="dropdown">
              Tìm kiếm đã lưu <span className="arrow">▼</span>
            </div>

            <div className="filter-icon">⚙️</div>
          </div>

          <div className="toolbar-stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="star">{s}</span>
            ))}
          </div>
        </div>
      </div>
      {openAddOwner && (
        <div className="modal-overlay" onClick={() => setOpenAddOwner(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm chủ sở hữu</h3>

            <div className="modal-form">
              <input
                placeholder="Họ tên"
                value={ownerForm.name}
                onChange={(e) => setOwnerForm({ ...ownerForm, name: e.target.value })}
              />
              <input
                placeholder="Email"
                value={ownerForm.email}
                onChange={(e) => setOwnerForm({ ...ownerForm, email: e.target.value })}
              />
              <input
                placeholder="Số điện thoại"
                value={ownerForm.phone}
                onChange={(e) => setOwnerForm({ ...ownerForm, phone: e.target.value })}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={ownerForm.password}
                onChange={(e) =>
                  setOwnerForm({ ...ownerForm, password: e.target.value })
                }
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setOpenAddOwner(false)}>
                Hủy
              </button>
              <button className="btn-save" onClick={handleAddOwner}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}




      {/* TABLE */}
      <div className="table-card">
        <h4>Danh Sách Khách Sạn</h4>

        <table>
          <thead>
            <tr>
              <th>Chủ khách sạn</th>
              <th>Tên khách sạn</th>
              <th>Ngày đăng ký</th>
              <th>Đánh giá</th>
              <th>Hoạt động</th>
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

                <td className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < h.rating ? "star active" : "star"}
                    >
                      ★
                    </span>
                  ))}
                </td>

                <td className="actions">
                  <span onClick={() => handleEdit(h)}>✏</span>
                  <span onClick={() => handleDelete(h.id)}>🗑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION FAKE (GIỐNG UI) */}
        <div className="pagination">
          <span>Số mục trên mỗi trang:</span>
          <select>
            <option>6</option>
          </select>
          <span>1-6</span>
          <span>{"<"}</span>
          <span>{">"}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
