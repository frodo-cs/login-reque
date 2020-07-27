const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 5000;
const cors = require('cors')
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var user = 'Default';

app.use(cors())
app.use(bodyParser.json() ); 
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, () => console.log(`Listening on port ${port}`));

var db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "12345",
    database: 'test'
});

db.connect(err => {
    if(err) console.log(err)
    console.log('Database connection established successfully');
})

app.post('/add_user', (req, res) => {
    let user = req.body
    const password = user.password
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db.query('call insert_user(?, ?, ?)', [user.fullname, user.username, hash], (err, result) => {
                if (err) console.log(err)
                else {
                    res.send(user.username + ' added.')
                }           
            })
        });
    });  
})

app.post('/validate/:username', (req, res) => {
    db.query('call validate(?)', [req.params.username], (err) => {
        if (err) console.log(err);
        else res.send(req.params.username + ' validated.')
    })
})

app.post('/login', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    db.query('select * from `user` where `username` = ?', username, function(err, rows){
        if (err){
            console.log("Error getting user: " + username)
            console.log(err)
            res.send(false)
        } else if (rows[0] != undefined) {
            bcrypt.compare(password, rows[0].pass).then(function(result){
                if (!result) {
                    console.log("Incorrect password")
                    res.send(false)
                }
                else {
                    user = {
                        username: rows[0].username,
                        admin: rows[0].admin,
                        validated: rows[0].validated
                    }
                    res.send(user)
                }
            })
        } else {
            console.log('Error getting user')
            res.send(false)
        }
    })
})

app.get('/users', function(req, res){
    db.query('select * from user where validated = 0', (err, rows) => {
        if(err) console.log(err);
        res.send(rows)
    })
})

app.get('/user/:username', function(req, res){

    db.query('select * from user where username = ?', [req.params.username], (err, rows) => {
        if(err) console.log(err);
        res.send(rows)
    })
})

app.get('/currentUser/', function(req, res){
    res.send(user)
})

app.post('/resetUser/', function(req, res){
    user = 'Default'
    res.send(true)
})