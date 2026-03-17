const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",   // your MySQL password
  database: "career_db"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }

  console.log("✅ Connected to MySQL successfully");
});

module.exports = db;