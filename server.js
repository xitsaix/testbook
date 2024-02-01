const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'bookingtest',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/submit', (req, res) => {
    const { item, date, Name, PhoneNumber, Email, ParticipateNum } = req.body;

    // Insert the data into the MySQL database
    const sql = 'INSERT INTO bookings (item, date, Name, PhoneNumber, Email, ParticipateNum) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [item, date, Name, PhoneNumber, Email, ParticipateNum], (err, result) => {
        if (err) {
            console.error('MySQL insertion error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Data inserted into MySQL database');
            res.status(200).send('Data inserted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
