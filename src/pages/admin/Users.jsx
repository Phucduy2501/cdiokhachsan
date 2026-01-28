import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const loadUsers = async () => {
    const res = await api.get("/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    const { name, email, phone, password } = form;

    if (!name || !email || !phone || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const res = await api.post("/api/users", form);
    alert(res.data.message);

    if (res.data.success) {
      setOpenAdd(false);
      setForm({ name: "", email: "", phone: "", password: "", role: "user" });
      loadUsers();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa người dùng này?")) return;
    await api.delete(`/api/users/${id}`);
    loadUsers();
  };

  const handleEdit = async (u) => {
    const name = prompt("Tên người dùng:", u.name);
    if (!name) return;

    const role = prompt("Loại thành viên (vip/user):", u.role || "user");
    if (!role) return;

    await api.put(`/api/users/${u.id}`, { name, role });
    loadUsers();
  };

  const formatDateVN = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return `${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
  };

  return (
    <div className="users-page">
        {/* HEADER */}
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

      {/* TOOLBAR */}
      <div className="users-toolbar">
        <input className="users-search" placeholder="🔍 Tìm kiếm" />

        <div className="users-right">
          <button className="btn-primary" onClick={() => setOpenAdd(true)}>
            Thêm người dùng <span className="plus">+</span>
          </button>

          <div className="users-options">
            <div className="dropdown">
              Sắp xếp theo <span className="arrow">▼</span>
            </div>
            <div className="dropdown">
              Tìm kiếm đã lưu <span className="arrow">▼</span>
            </div>
            <div className="filter-icon">≡</div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <h4>Danh Sách Người dùng</h4>

        <table>
          <thead>
            <tr>
              <th>Tên người dùng</th>
              <th>Hạng thành viên</th>
              <th>Ngày nhận phòng</th>
              <th>Ngày trả phòng</th>
              <th>Hoạt động</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <strong>{u.name}</strong>
                  <p>{u.email}</p>
                </td>

                <td>
                  <span className={u.role === "vip" ? "badge vip" : "badge normal"}>
                    {u.role === "vip" ? "Thành viên Vip" : "Thành viên thường"}
                  </span>
                </td>

                {/* demo UI giống hình */}
                <td>{formatDateVN(u.created_at)}</td>
                <td>{formatDateVN(u.created_at)}</td>

                <td className="actions">
                  <span onClick={() => handleEdit(u)}>✏</span>
                  <span onClick={() => handleDelete(u.id)}>🗑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
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

      {/* MODAL ADD */}
      {openAdd && (
        <div className="modal-overlay" onClick={() => setOpenAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm người dùng</h3>

            <div className="modal-form">
              <input
                placeholder="Họ tên"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="user">Thành viên thường</option>
                <option value="vip">Thành viên Vip</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setOpenAdd(false)}>
                Hủy
              </button>
              <button className="btn-save" onClick={handleAddUser}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
