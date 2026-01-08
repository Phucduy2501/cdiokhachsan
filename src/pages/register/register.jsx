import "./register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="login-container">
      <div className="login-image">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Hotel"
        />
      </div>

      <div className="login-form">
        <h2>Đăng ký Tài Khoản</h2>

        <div className="form-group">
          <label>Số căn cước</label>
          <input type="text" placeholder="Số căn cước" />
        </div>

        <div className="form-group">
          <label>Họ và tên</label>
          <input type="text" placeholder="Họ tên đầy đủ" />
        </div>

        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input type="text" placeholder="Tên người dùng" />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>

        <div className="form-group">
          <label>Nhập lại mật khẩu</label>
          <input type="password" placeholder="Nhập lại mật khẩu" />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input type="text" placeholder="Số điện thoại" />
        </div>

        <button className="login-btn">Đăng ký</button>

        <div className="login-links">
          <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
