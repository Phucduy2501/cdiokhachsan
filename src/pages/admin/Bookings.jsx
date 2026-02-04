import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Hotels.css";
import "./booking.css";

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

  const getRoleText = (h) => "Chủ sở hữu";

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
        <div className="hello">
          <h3>Xin chào, Chủ khách sạn</h3>
          <p>Chúc 1 ngày tốt lành</p>
        </div>

        <div className="user-info">
          <span className="bell">🔔</span>
          <span className="divider"></span>

          <div className="avatar-circle"></div>

          <div className="user-text">
            <strong>Wejaya Raaj</strong>
            <p>Chủ khách sạn</p>
          </div>

          <span className="caret">▾</span>
        </div>
      </div>

      <h2 className="page-title">Chủ khách sạn</h2>

      <div className="top-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input className="hotels-search" placeholder="Tìm kiếm" />
        </div>

        <div className="sort-box">
          <span className="sort-text">Xếp theo</span>
          <span className="sort-icon">🎚</span>
        </div>
      </div>

      <div className="action-toolbar">
        <div className="left-icons">
          <button className="tool-icon" title="Danh sách">
            📄
          </button>
          <button className="tool-icon" title="Phóng to">
            ⛶
          </button>
          <button className="tool-icon" title="Tải">
            ⬇
          </button>
          <button className="tool-icon" title="In">
            🖨
          </button>
          <button className="tool-icon" title="Xóa">
            🗑
          </button>
        </div>

        <div className="right-filter">
          <div className="filter-dropdown">
            <span>Tháng này</span>
            <span className="arrow">▾</span>
          </div>
          <div className="filter-dropdown">
            <span>Đặt phòng</span>
            <span className="arrow">▾</span>
          </div>

          <button className="btn-add">+</button>
        </div>
      </div>
      <div className="table-card">
        <h4>Thông tin đặt phòng khách sạn</h4>

        

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
