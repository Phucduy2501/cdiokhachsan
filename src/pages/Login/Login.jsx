import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import image from "../../assets/2.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      const res = await fetch("https://cdiokhachsan-production.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        console.log("User:", data.user);
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
        <h2>Đăng Nhập Tài Khoản</h2>

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
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Vui lòng nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Đăng Nhập
        </button>

        <div className="login-links">
          <Link to="/register">Đăng Ký</Link>
          <Link to="/password">Quên Mật Khẩu</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
