import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/2.jpg";
import "../Login/Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      alert("Không kết nối được server");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={image} alt="Hotel" />
      </div>

      <div className="login-form">
        <h2>Đăng Ký Tài Khoản</h2>

        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Nhập lại mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleRegister}>
          Đăng Ký
        </button>

        <div className="login-links">
          <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
