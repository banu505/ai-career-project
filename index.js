// Import packages
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // put your mysql password if you have
  database: "sj_database"
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "../")));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// ================= REGISTER =================
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Registration failed ❌" });
    }

    res.json({ message: "User registered successfully ✅" });
  });
});


// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error ❌" });
    }

    if (results.length > 0) {
      res.json({ message: "Login successful ✅" });
    } else {
      res.status(401).json({ error: "Invalid credentials ❌" });
    }
  });
});


// Start server on PORT 3000
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});