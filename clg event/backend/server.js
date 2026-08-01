const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",   // Change if your MySQL password is different
    database: "college_event"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("MySQL Connected");
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

app.listen(5000, () => {
    console.log("Server Running on http://localhost:5000");
});