import { Link } from "react-router-dom";
import Login from "../Login/Login";
import image from "../../assets/2.jpg";

function Password() {
  return (
    <div className="login-container">
      <div className="login-image">
              <img src={image} alt="Hotel" />
            </div>

      <div className="login-form">
        <h2>Quên mật khẩu</h2>

        <div className="form-group">
          <label>Nhập Email:</label>
          <input type="email" placeholder="Nhập email" />
        </div>

       
        <button className="login-btn">Gửi mã xác thực</button>

        <div className="login-links">
          <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}

export default Password;
