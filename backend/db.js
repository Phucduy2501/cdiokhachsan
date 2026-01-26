import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // nếu có thì điền
    database: "bookstay",
});

db.connect((err) => {
    if (err) {
        console.log("❌ Lỗi DB:", err);
    } else {
        console.log("✅ MySQL connected");
    }
});

export default db;