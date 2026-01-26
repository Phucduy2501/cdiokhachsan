import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
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
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

export default router;