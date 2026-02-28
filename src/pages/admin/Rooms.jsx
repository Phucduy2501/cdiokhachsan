import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Hotels.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  const loadHotels = async () => {
    const res = await api.get("/api/hotels");
    setHotels(res.data);
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const formatDateVN = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return `${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
  };

  const getRoleText = (h) => {
    return "Chủ sở hữu";
  };

  const getBadgeType = (h) => {
    if (h.rating >= 5) return "admin";
    if (h.rating >= 4) return "owner";
    return "pending";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa khách sạn này?")) return;
    await api.delete(`/api/hotels/${id}`);
    loadHotels();
  };

  const handleEdit = async (hotel) => {
    const name = prompt("Tên khách sạn:", hotel.hotel_name);
    const rating = prompt("Đánh giá (1-5):", hotel.rating);
    if (!name || !rating) return;

    await api.put(`/api/hotels/${hotel.id}`, { name, rating });
    loadHotels();
  };

  return (
    <div className="hotels-page">
      <div className="dashboard-header">
        <div>
          <h3>Xin Chào, Phúc Duy</h3>
          <p>Chúc 1 ngày tốt lành</p>
        </div>

        <div className="user-info">
          <span className="bell">🔔</span>
          <span className="divider"></span>

          <img
            className="avatar"
            src="/71dbf3f6-ac1b-4262-9312-3016b8c754fc.jpg"
            alt="avatar"
          />

          <div className="user-text">
            <strong>Phúc Duy</strong>
            <p>Admin</p>
          </div>

          <span className="caret">▾</span>
        </div>
      </div>

      <div className="hotels-toolbar">
        <input className="hotels-search" placeholder="🔍 Tìm kiếm" />

        <div className="hotels-right">
          <button className="btn-primary">
            Thêm chủ sở hữu <span className="plus">+</span>
          </button>

          <div className="hotels-options">
            <div className="dropdown">
              Sắp xếp theo <span className="arrow">▼</span>
            </div>
            <div className="dropdown">
              Tìm kiếm đã lưu <span className="arrow">▼</span>
            </div>
            <div className="filter-icon">≡</div>
          </div>

          <div className="toolbar-stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="star">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="table-card">
        <h4>Danh Sách Chủ Khách Sạn</h4>

        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th></th>
              <th>Ngày tạo</th>
              <th>Vai trò</th>
              <th>Hoạt động</th>
            </tr>
          </thead>

          <tbody>
            {hotels.map((h) => {
              const type = getBadgeType(h);

              return (
                <tr key={h.id}>
                  <td>
                    <strong>{h.owner_name}</strong>
                    <p>{h.owner_email}</p>
                  </td>
                  <td>
                    <span className={`badge ${type}`}>
                      {type === "admin"
                        ? "Quản trị viên cấp"
                        : type === "owner"
                        ? "Chủ sở hữu"
                        : "Chưa xác nhận"}
                    </span>
                  </td>

                  <td>{formatDateVN(h.created_at)}</td>

                  <td className="role-text">{getRoleText(h)}</td>

                  <td className="actions">
                    <button
                      className="icon-btn"
                      title="Sửa"
                      onClick={() => handleEdit(h)}
                    >
                      ✎
                    </button>
                    <button
                      className="icon-btn"
                      title="Xóa"
                      onClick={() => handleDelete(h.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION UI */}
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

export default Hotels;
