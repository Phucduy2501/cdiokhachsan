
import "./Login.css";
import Register from "../register/register";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <div className="login-image">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Hotel"
        />
      </div>
      <div className="login-form">
        <h2>Đăng Nhập Tài Khoản</h2>

        <div className="form-group">
          <label>Tên Tài Khoản</label>
          <input type="text" placeholder="Tên người dùng" />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input type="password" placeholder="vui lòng nhập mật khẩu" />
        </div>

        <button className="login-btn">Đăng Nhập</button>

        <div className="login-links">
          <Link to="/register">Đăng Ký</Link>
          <Link to="/forgot-password">Quên Mật Khẩu</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
