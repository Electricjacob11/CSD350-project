const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to SQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "montessori_attendance"
});

db.connect(err => {
    if (err) {
        console.error("DB connection failed:", err);
    } else {
        console.log("Connected to database");
    }
});

// POST: receive form data
app.post("/submit", (req, res) => {
    const { StudentName, AttendanceStatus } = req.body;

    db.query(
        "INSERT INTO student (StudentName, AttendanceStatus) VALUES (?, ?)",
        [StudentName, AttendanceStatus],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json({ success: true });
            }
        }
    );
});

// GET: fetch data from database
app.get("/data", (req, res) => {
    db.query(
        "SELECT StudentID, StudentName, AttendanceStatus FROM student",
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json(results);
            }
        }
    );
});

app.post("/toggle-attendance", (req, res) => {
    const { StudentID, AttendanceStatus } = req.body;

    if (!StudentID) {
        return res.status(400).json({ error: "Missing StudentID" });
    }

    const newStatus =
        AttendanceStatus === "Checked In" ? "Checked Out" : "Checked In";

    db.query(
        "UPDATE student SET AttendanceStatus = ? WHERE StudentID = ?",
        [newStatus, StudentID],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ success: true, newStatus });
        }
    );
});

app.post("/verify-pin", (req, res) => {
    const { pin } = req.body;

    const sql = `
        SELECT s.StudentID, s.StudentName, s.AttendanceStatus
        FROM STUDENT s
        JOIN STUDENT_AUTHORIZED_ADULT saa ON s.StudentID = saa.StudentID
        JOIN AUTHORIZED_ADULT aa ON saa.AdultID = aa.AdultID
        WHERE aa.AdultCode = ?
    `;

    db.query(sql, [pin], (err, results) => {
        if (err) {
            console.error("SQL ERROR:", err);
            return res.status(500).json({
                error: err.sqlMessage
            });
        }

        if (!results || results.length === 0) {
            return res.json({
                success: false,
                message: "Invalid PIN"
            });
        }

        res.json({
            success: true,
            student: results[0]
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});