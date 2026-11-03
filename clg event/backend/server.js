const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
// MySQL Connection - Secure Configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "college_event",
    port: Number(process.env.DB_PORT) || 3306
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err.message);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

// ======================
// Register Student
// ======================

app.post("/register", (req, res) => {

    const {
        name,
        regno,
        department,
        year,
        event,
        phone,
        email
    } = req.body;

    const sql = `
    INSERT INTO registrations
    (name, regno, department, year, event, phone, email)
    VALUES (?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [name, regno, department, year, event, phone, email],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
            success: true,
            message: "Registration Successful"
});

        }
    );

});

// ======================
// View All Students
// ======================

app.get("/students", (req, res) => {

    db.query(
        "SELECT * FROM registrations",
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});

// ======================
// Update Student
// ======================

app.put("/students/:id", (req, res) => {

    const id = req.params.id;

    const {
        name,
        regno,
        department,
        year,
        event,
        phone,
        email
    } = req.body;

    const sql = `
    UPDATE registrations
    SET
    name=?,
    regno=?,
    department=?,
    year=?,
    event=?,
    phone=?,
    email=?
    WHERE id=?
    `;

    db.query(
        sql,
        [
            name,
            regno,
            department,
            year,
            event,
            phone,
            email,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Student Updated Successfully"
            });

        }
    );

});

// ======================
// Delete Student
// ======================

app.delete("/students/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM registrations WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Student Deleted Successfully"
            });

        }
    );

});

// ======================
// Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
