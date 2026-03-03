import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Hotels.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");

  const loadHotels = async () => {
    const res = await api.get("/api/hotels");
    setHotels(res.data || []);
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const formatDateVN = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return `${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
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

    await api.put(`/api/hotels/${hotel.id}`, {
      hotel_name: name,
      rating: Number(rating),
    });

    loadHotels();
  };

  const filteredHotels = hotels.filter((h) =>
    h.hotel_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hotels-page">

      <div className="dashboard-header">
        <div>
          <h3>Quản lý khách sạn</h3>
          <p>Danh sách tất cả khách sạn trong hệ thống</p>
        </div>
      </div>

      <div className="hotels-toolbar">
        <input
          className="hotels-search"
          placeholder="🔍 Tìm khách sạn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-primary">
          + Thêm khách sạn
        </button>
      </div>

      <div className="table-card">
        <h4>Danh Sách Khách Sạn</h4>

        <table>
          <thead>
            <tr>
              <th>Tên khách sạn</th>
              <th>Chủ sở hữu</th>
              <th>Ngày tạo</th>
              <th>Đánh giá</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredHotels.map((h) => (
              <tr key={h.id}>
                <td>
                  <strong>{h.hotel_name}</strong>
                </td>

                <td>
                  <p>{h.owner_name}</p>
                  <span className="sub-text">
                    {h.owner_email}
                  </span>
                </td>

                <td>{formatDateVN(h.created_at)}</td>

                <td className="rating">
                  {"★".repeat(h.rating || 0)}
                </td>

                <td className="actions">
                  <button
                    className="icon-btn"
                    onClick={() => handleEdit(h)}
                  >
                    ✎
                  </button>

                  <button
                    className="icon-btn"
                    onClick={() => handleDelete(h.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredHotels.length === 0 && (
          <div className="empty-state">
            Không có khách sạn nào
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;