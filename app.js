const express = require("express");
const app = express();
const env = require("dotenv");
const bcrypt = require("bcrypt");
// const {Pool} = require("pg");
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
// const poolDB = new Pool({
//     host: "localhost",
//     database: "aeroBlog",
//     user: "postgres",
// })
const db = require("./models");
const {users, reviews} = require("./models");
env.config();
const PORT = process.env.PORT;
const connectionString = process.env.DATABASE_URL;
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", express.static(__dirname + '/assets'));
app.set("view engine", 'ejs');

// Trang đầu
app.get("/index", (req, res, next) => {
    res.render('index');
})
app.get("/sign-in", (req, res, next) => {
    res.render("signin");
})
app.post("/sign-in", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const retypePassword = req.body.retypePassword;
    if (password != retypePassword) {
        res.send("password retype not match");
        return;
    }

    salt = bcrypt.genSalt(10);
    password = bcrypt.hash(password, salt);

    try {
        const newUser = await users.create({username, password, description: "123123"});
        return res.json(newUser);
    } catch(e) {
        if (e) {
            console.log(e);
        }
    }
})

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log("\nlistening to port: " + PORT);
    })
})
