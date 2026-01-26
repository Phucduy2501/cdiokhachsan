import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Hotels.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    api.get("/api/hotels").then((res) => {
      setHotels(res.data);
    });
  }, []);

  const formatDateVN = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day} Tháng ${month}, ${year}`;
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h3>Xin Chào, Phúc Duy</h3>
          <p>Chúc 1 ngày tốt lành</p>
        </div>

        <div className="admin-user">
          <span className="bell">🔔</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="avatar"
          />
          <div>
            <strong>Phúc Duy</strong>
            <p>Admin</p>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <input placeholder="🔍 Tìm kiếm" />
        <button className="btn-primary">Thêm chủ sở hữu +</button>
      </div>

      {/* TABLE CARD */}
      <div className="card">
        <h4>Danh sách khách sạn</h4>

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
                  <span className="edit">✏</span>
                  <span className="delete">🗑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotels;
