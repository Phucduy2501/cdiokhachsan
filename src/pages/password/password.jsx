import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/2.jpg";
import "../Login/Login.css";

function Password() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      alert("Vui lòng nhập email");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setStep(2);
      }
    } catch (error) {
      alert("Không kết nối được server");
    }
  };

  // ================= STEP 2: VERIFY OTP =================
  const handleVerifyOtp = async () => {
    if (!otp || !newPassword) {
      alert("Vui lòng nhập đầy đủ OTP và mật khẩu mới");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
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
        <h2>Quên mật khẩu</h2>

        {/* ========== STEP 1 UI ========== */}
        {step === 1 && (
          <>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="login-btn" onClick={handleSendOtp}>
              Gửi mã xác thực
            </button>
          </>
        )}

        {/* ========== STEP 2 UI ========== */}
        {step === 2 && (
          <>
            <div className="form-group">
              <label>Mã OTP</label>
              <input
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button className="login-btn" onClick={handleVerifyOtp}>
              Xác nhận & đổi mật khẩu
            </button>
          </>
        )}

        <div className="login-links">
          <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}

export default Password;
