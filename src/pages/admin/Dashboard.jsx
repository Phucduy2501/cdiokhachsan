import { useEffect, useState, useRef } from "react";
import { supabase } from "../../services/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    loadDashboard();
    getCurrentUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user || null);
  };

  const loadDashboard = async () => {
    const { data: usersData } = await supabase.from("users").select("*");
    const { data: roomsData } = await supabase.from("rooms").select("*");
    const { data: bookingsData } = await supabase
      .from("bookings")
      .select(`
        *,
        users(name, email),
        rooms(name)
      `);

    setUsers(usersData || []);
    setRooms(roomsData || []);
    setBookings(bookingsData || []);

    generateChart(bookingsData || []);
  };

  const generateChart = (data) => {

    const days = [];

    for (let i = 6; i >= 0; i--) {

      const d = new Date();
      d.setDate(d.getDate() - i);

      const dateStr = d.toISOString().slice(0,10);

      const count = data.filter((b) => b.check_in === dateStr).length;

      days.push({
        date: dateStr,
        count
      });

    }

    setChartData(days);

  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const totalUsers = users.length;
  const totalRooms = rooms.length;

  const today = new Date().toISOString().slice(0, 10);

  const todayBookings = bookings.filter(
    (b) => b.check_in === today
  ).length;

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.total_price || 0),
    0
  );

  const currentDate = new Date().toISOString().slice(0, 10);

  const isRoomBooked = (roomId) => {
    return bookings.some(
      (b) =>
        b.room_id === roomId &&
        b.check_in <= currentDate &&
        b.check_out >= currentDate
    );
  };

  const recentActivities = bookings.slice(-5).reverse();

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h3>Xin Chào, {user?.email}</h3>
          <p>Chúc 1 ngày tốt lành</p>
        </div>

        <div className="header-right" ref={menuRef}>
          <span className="bell">🔔</span>

          <div
            className="admin-info"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${user?.email}`}
              alt="avatar"
            />
            <div>
              <strong>{user?.email}</strong>
              <p>Admin</p>
            </div>
          </div>

          {openMenu && (
            <div className="admin-dropdown">
              <button onClick={handleLogout}>🚪 Đăng xuất</button>
            </div>
          )}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="👤 Tổng User" value={totalUsers} />
        <StatCard title="🛏 Tổng Phòng" value={totalRooms} />
        <StatCard title="📦 Booking hôm nay" value={todayBookings} />
        <StatCard title="💰 Tổng doanh thu" value={`${totalRevenue.toLocaleString()} VND`} />
      </div>

      <div className="chart-card">
        <h4>Booking 7 ngày gần nhất</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-bottom">

        <div className="activity-card">
          <h4>Hoạt động gần đây</h4>

          {recentActivities.length === 0 && (
            <p>Chưa có hoạt động nào</p>
          )}

          {recentActivities.map((b) => (
            <div key={b.id} className="activity-item">
              <p>
                {b.users?.name} đặt phòng{" "}
                <strong>{b.rooms?.name}</strong>
              </p>
              <span>
                {new Date(b.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="room-status-card">
          <h4>Trạng thái phòng</h4>

          {rooms.map((r) => {
            const booked = isRoomBooked(r.id);

            return (
              <div key={r.id} className="room-status-item">
                <span>{r.name}</span>
                <span className={`badge ${booked ? "yellow" : "green"}`}>
                  {booked ? "Đang được đặt" : "Hoạt động"}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h5>{title}</h5>
    <h2>{value}</h2>
  </div>
);