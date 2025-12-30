const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authMiddleware");

// GET all users (protected)
router.get("/", authenticate, (req, res) => {
  db.query(
    "SELECT id, name, email, role, created_at FROM users_v2",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// POST add new user (protected)
router.post("/", authenticate, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users_v2 (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "User"],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User added", id: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update user (protected)
router.put("/:id", authenticate, (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE users_v2 SET name=?, email=?, role=? WHERE id=?",
    [name, email, role, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated" });
    }
  );
});

// DELETE user (protected)
router.delete("/:id", authenticate, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users_v2 WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
});

module.exports = router;
