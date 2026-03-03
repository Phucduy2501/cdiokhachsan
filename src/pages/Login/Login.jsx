import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/2.jpg";
import { supabase } from "../../services/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert("Email hoặc mật khẩu không đúng");
      return;
    }

    const authUser = data.user;

    let { data: userRow } = await supabase
      .from("users")
      .select("id, email, name, role")
      .eq("id", authUser.id)
      .maybeSingle();

    if (!userRow) {
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            id: authUser.id,
            email: authUser.email,
            name: authUser.email.split("@")[0], 
            role: "guest",
          },
        ])
        .select()
        .single();

      if (insertError) {
        setLoading(false);
        alert("Không tạo được user");
        return;
      }

      userRow = newUser;
    }

    setLoading(false);

    localStorage.setItem("user", JSON.stringify(userRow));

    if (userRow.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/home", { replace: true });
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
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