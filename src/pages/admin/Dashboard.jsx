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
    const { data: usersData } = await supabase.from("profiles").select("*");
    const { data: roomsData } = await supabase.from("rooms").select("*");
    const { data: bookingsData } = await supabase
      .from("bookings")
      .select(`
        *,
        rooms(name),
        profiles(full_name)
      `);

    setUsers(usersData || []);
    setRooms(roomsData || []);
    setBookings(bookingsData || []);
    generateChart(bookingsData || []);
  };

  const generateChart = (data) => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().slice(0, 10);
    });

    const chart = last7Days.reverse().map((date) => ({
      date,
      count: data.filter(
        (b) => b.created_at?.slice(0, 10) === date
      ).length,
    }));

    setChartData(chart);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const totalUsers = users.length;
  const totalRooms = rooms.length;
  const activeRooms = rooms.filter((r) => r.status === "active").length;

  const todayBookings = bookings.filter((b) => {
    const today = new Date().toISOString().slice(0, 10);
    return b.created_at?.slice(0, 10) === today;
  }).length;

  const recentActivities = bookings.slice(-5).reverse();

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h3>Xin Chào, {user?.email || "Admin"}</h3>
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
        <StatCard title="🟢 Phòng hoạt động" value={activeRooms} />
        <StatCard title="📦 Booking hôm nay" value={todayBookings} />
      </div>

      <div className="chart-card">
        <h4>Booking 7 ngày gần nhất</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
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
          {recentActivities.map((b) => (
            <div key={b.id} className="activity-item">
              <p>
                {b.profiles?.full_name || "User"} đặt phòng{" "}
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
          {rooms.map((r) => (
            <div key={r.id} className="room-status-item">
              <span>{r.name}</span>
              <span
                className={`badge ${
                  r.status === "active"
                    ? "green"
                    : r.status === "booked"
                    ? "yellow"
                    : "red"
                }`}
              >
                {r.status || "inactive"}
              </span>
            </div>
          ))}
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