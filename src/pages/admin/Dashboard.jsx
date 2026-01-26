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
          <img src="https://i.pravatar.cc/40" />
          <div>
            <strong>Phúc Duy</strong>
            <p>Admin</p>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="dashboard-toolbar">
        <input placeholder="🔍 Tìm kiếm" />
        <button className="btn-primary">Thêm chủ sở hữu +</button>
      </div>

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
