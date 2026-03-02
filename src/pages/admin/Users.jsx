import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, role, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load users error:", error);
      return;
    }

    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="users-page">
      <div className="dashboard-header">
        <div>
          <h3>Xin chào, {currentUser?.name}</h3>
          <p>Chúc bạn một ngày tốt lành</p>
        </div>
      </div>

      <h2 className="page-title">Danh sách người dùng</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="4">Chưa có người dùng</td>
            </tr>
          )}

          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {new Date(u.created_at).toLocaleDateString("vi-VN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;