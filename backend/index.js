const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookstay",
});

let otpStore = {}; 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "vanduyt178@gmail.com", 
        pass: "dnqhembxggiarplz", 
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("❌ LỖI EMAIL:", error);
    } else {
        console.log("✅ EMAIL READY TO SEND");
    }
});



app.get("/", (req, res) => {
    res.send("Backend running...");
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?", [email, password],
        (err, result) => {
            if (err) return res.json({ success: false, message: "Lỗi server" });

            if (result.length > 0) {
                res.json({
                    success: true,
                    message: "Đăng nhập thành công",
                    user: {
                        id: result[0].id,
                        email: result[0].email,
                        role: result[0].role,
                    },
                });
            } else {
                res.json({
                    success: false,
                    message: "Sai email hoặc mật khẩu",
                });
            }
        }
    );
});

app.post("/register", (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.json({ success: false, message: "Vui lòng nhập đầy đủ thông tin" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (result.length > 0) {
      return res.json({ success: false, message: "Email đã tồn tại" });
    }

    db.query(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, phone, "owner"],
      () => {
        res.json({ success: true, message: "Thêm chủ sở hữu thành công" });
      }
    );
  });
});


app.post("/send-otp", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Thiếu email" });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?", [email],
        (err, result) => {
            if (result.length === 0) {
                return res.json({
                    success: false,
                    message: "Email không tồn tại",
                });
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            otpStore[email] = otp;

            const mailOptions = {
                from: "YOUR_EMAIL@gmail.com",
                to: email,
                subject: "Mã OTP đặt lại mật khẩu",
                text: `Mã OTP của bạn là: ${otp}`,
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return res.json({
                        success: false,
                        message: "Gửi email thất bại",
                    });
                }

                res.json({
                    success: true,
                    message: "Đã gửi OTP qua email",
                });
            });
        }
    );
});

app.post("/verify-otp", (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Thiếu thông tin" });
    }

    if (otpStore[email] != otp) {
        return res.json({
            success: false,
            message: "OTP không đúng",
        });
    }

    db.query(
        "UPDATE users SET password = ? WHERE email = ?", [newPassword, email],
        () => {
            delete otpStore[email];

            res.json({
                success: true,
                message: "Đổi mật khẩu thành công",
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});


app.get("/api/hotels", (req, res) => {
    const sql = `
        SELECT
            hotels.id,
            users.name AS owner_name,
            users.email AS owner_email,
            hotels.name AS hotel_name,
            hotels.created_at,
            hotels.rating
        FROM hotels
        JOIN users ON hotels.owner_id = users.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.log("❌ Lỗi lấy hotels:", err);
            return res.status(500).json({ success: false });
        }
        res.json(results);
    });
});

app.delete("/api/hotels/:id", (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM hotels WHERE id = ?", [id],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false });
            }
            res.json({ success: true });
        }
    );
});

app.put("/api/hotels/:id", (req, res) => {
    const { id } = req.params;
    const { name, rating } = req.body;

    db.query(
        "UPDATE hotels SET name = ?, rating = ? WHERE id = ?", [name, rating, id],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false });
            }
            res.json({ success: true });
        }
    );
});


// LẤY DANH SÁCH USERS
app.get("/api/users", (req, res) => {
  db.query("SELECT id, name, email, role, created_at FROM users", (err, results) => {
    if (err) {
      console.log("❌ Lỗi lấy users:", err);
      return res.status(500).json({ success: false });
    }
    res.json(results);
  });
});

// THÊM USER
app.post("/api/users", (req, res) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone) {
    return res.json({ success: false, message: "Thiếu thông tin" });
  }

  db.query(
    "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, password, phone, role || "user"],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Lỗi thêm user" });
      }
      res.json({ success: true, message: "Thêm người dùng thành công" });
    }
  );
});

// SỬA USER
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  db.query(
    "UPDATE users SET name = ?, role = ? WHERE id = ?",
    [name, role, id],
    (err) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    }
  );
});

// XÓA USER
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});
