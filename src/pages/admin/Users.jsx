import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    if (!form.name || !form.email) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }

    await api.post("/users", form);
    setOpenAdd(false);
    setForm({ name: "", email: "", role: "user" });
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa người dùng?")) return;
    await api.delete(`/users/${id}`);
    loadUsers();
  };

  const handleEdit = async (u) => {
    const name = prompt("Tên:", u.name);
    if (!name) return;

    const role = prompt("Role (admin/user):", u.role);
    if (!role) return;

    await api.put(`/users/${u.id}`, { name, role });
    loadUsers();
  };

  return (
    <div className="users-page">
      <div className="dashboard-header">
        <div>
          <h3>Xin chào, {currentUser?.name}</h3>
          <p>Chúc bạn một ngày tốt lành</p>
        </div>
      </div>

      <button onClick={() => setOpenAdd(true)}>Thêm người dùng</button>

      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEdit(u)}>✎</button>
                <button onClick={() => handleDelete(u.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openAdd && (
        <div className="modal">
          <input
            placeholder="Tên"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={handleAddUser}>Lưu</button>
          <button onClick={() => setOpenAdd(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default Users;