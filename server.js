const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");
const { predictCareer } = require("./aiCareerModel");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/* ---------------- REGISTER ---------------- */

app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const checkSql = "SELECT * FROM users WHERE email=?";

    db.query(checkSql, [email], async (err, results) => {

        if (results.length > 0) {
            return res.json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

        db.query(sql, [name, email, hashedPassword], (err, result) => {

            if (err) {
                return res.status(500).json({ error: "Insert failed" });
            }

            res.json({
                message: "User registered successfully",
                userId: result.insertId
            });

        });

    });

});


/* ---------------- LOGIN ---------------- */

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async (err, results) => {

        if (results.length === 0) {
            return res.json({ error: "User not found" });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({ error: "Invalid password" });
        }

        res.json({
            message: "Login successful",
            userId: user.id
        });

    });

});


/* ---------------- AI CAREER PREDICTION ---------------- */

/* ---------------- AI CAREER PREDICTION ---------------- */
fetch("https://your-app.onrender.com/api/predict-career", {

    const { answers, userId } = req.body;

    if (!answers) {
        return res.status(400).json({ error: "Answers missing" });
    }

    try {

        // Call Python AI model
        const career = await predictCareer(answers);

        const sql = `
        INSERT INTO career_results (user_id,result_data,completed_date)
        VALUES (?, ?, NOW())
        `;

        // IMPORTANT: convert to JSON
        db.query(sql, [userId, JSON.stringify(career)], (err) => {

            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({
                    error: "Failed to save results"
                });
            }

            res.json({
                message: "Prediction successful",
                career: career
            });

        });

    } catch (error) {

        console.error("AI prediction error:", error);

        res.status(500).json({
            error: "AI prediction failed"
        });

    }

});
/* ---------------- GET RESULT ---------------- */

app.get("/results/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql = `
    SELECT * FROM career_results
    WHERE user_id=?
    ORDER BY completed_date DESC
    LIMIT 1
    `;

    db.query(sql, [userId], (err, result) => {

        if (result.length === 0) {
            return res.json({ error: "No results found" });
        }

        const data = JSON.parse(result[0].result_data);

        res.json(data);

    });

});


/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});
