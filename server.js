const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

//  Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));   // Loads index.html automatically

//  Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shivam@54321",  // 🔴 Put your MySQL password here
  database: "crud_app",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("MySQL Connected...");
});


//  CRUD ROUTES


// CREATE
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Insert failed" });
    }
    res.json({ message: "User added successfully" });
  });
});


// READ
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Fetch failed" });
    }
    res.json(results);
  });
});


// UPDATE
app.put("/users/:id", (req, res) => {
  const { name, email, age } = req.body;
  const id = req.params.id;

  const sql = "UPDATE users SET name=?, email=?, age=? WHERE id=?";
  db.query(sql, [name, email, age, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Update failed" });
    }
    res.json({ message: "User updated successfully" });
  });
});


// DELETE
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Delete failed" });
    }
    res.json({ message: "User deleted successfully" });
  });
});


//  Start Server

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});