require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    connectTimeout: 10000,
});


db.connect((err) => {
    if (err) {
        console.error("❌ MySQL error:", err.message);
    } else {
        console.log("✅ MySQL connected to", process.env.MYSQLDATABASE);
    }
});

/* =========================
   EMAIL (NODEMAILER)
========================= */
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

transporter.verify((err) => {
    if (err) console.log("❌ Email error:", err);
    else console.log("✅ Email ready");
});

let otpStore = {};

/* =========================
   TEST ROOT
========================= */
app.get("/", (req, res) => {
    res.send("Backend running...");
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT id, name, email, role FROM users WHERE email = ? AND password = ?", [email, password],
        (err, result) => {
            if (err) {
                console.error("LOGIN ERROR:", err);
                return res.status(500).json({ success: false });
            }

            if (result.length === 0) {
                return res.json({ success: false, message: "Sai email hoặc mật khẩu" });
            }

            res.json({
                success: true,
                message: "Đăng nhập thành công",
                user: result[0],
            });
        }
    );
});


/* =========================
   REGISTER
========================= */
app.post("/register", (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.json({ success: false, message: "Thiếu thông tin" });
    }

    db.query(
        "SELECT id FROM users WHERE email = ?", [email],
        (err, result) => {
            if (result.length > 0) {
                return res.json({
                    success: false,
                    message: "Email đã tồn tại",
                });
            }

            db.query(
                "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, 'user')", [name, email, password, phone],
                () => res.json({ success: true })
            );
        }
    );
});

/* =========================
   OTP RESET PASSWORD
========================= */
app.post("/send-otp", (req, res) => {
    const { email } = req.body;

    db.query(
        "SELECT id FROM users WHERE email = ?", [email],
        (err, result) => {
            if (result.length === 0) {
                return res.json({
                    success: false,
                    message: "Email không tồn tại",
                });
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            otpStore[email] = otp;

            transporter.sendMail({
                    from: process.env.MAIL_USER,
                    to: email,
                    subject: "Mã OTP đặt lại mật khẩu",
                    text: `Mã OTP của bạn là: ${otp}`,
                },
                (error) => {
                    if (error) return res.json({ success: false });
                    res.json({ success: true });
                }
            );
        }
    );
});

app.post("/verify-otp", (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (otpStore[email] != otp) {
        return res.json({ success: false, message: "OTP không đúng" });
    }

    db.query(
        "UPDATE users SET password = ? WHERE email = ?", [newPassword, email],
        () => {
            delete otpStore[email];
            res.json({ success: true });
        }
    );
});

/* =========================
   HOTELS
========================= */
app.get("/api/hotels", (req, res) => {
    const sql = `
        SELECT h.id, h.name, h.rating, h.created_at,
               u.name AS owner_name, u.email AS owner_email
        FROM hotels h
        JOIN users u ON h.owner_id = u.id
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ success: false });
        res.json(results);
    });
});

app.put("/api/hotels/:id", (req, res) => {
    const { name, rating } = req.body;

    db.query(
        "UPDATE hotels SET name = ?, rating = ? WHERE id = ?", [name, rating, req.params.id],
        () => res.json({ success: true })
    );
});

app.delete("/api/hotels/:id", (req, res) => {
    db.query(
        "DELETE FROM hotels WHERE id = ?", [req.params.id],
        () => res.json({ success: true })
    );
});

/* =========================
   USERS (ADMIN)
========================= */
app.get("/api/users", (req, res) => {
    db.query(
        "SELECT id, name, email, role, created_at FROM users",
        (err, results) => {
            if (err) return res.status(500).json({ success: false });
            res.json(results);
        }
    );
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});