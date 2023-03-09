const express = require("express");
const app = express();
const env = require("dotenv");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const db = require("./models");
const {users, reviews} = require("./models");
const passport = require("./passport-config.js");
const { createNewUser } = require("./utils");
const session = require("express-session");
env.config();
const PORT = process.env.PORT;
const connectionString = process.env.DATABASE_URL;
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", express.static(__dirname + '/assets'));
app.use(session ({
    secret:"lol",
    resave: false,
    saveUninitialized: false
}))
app.set("view engine", 'ejs');

app.use(passport.initialize());
app.use(passport.session());
// Trang đầu
app.get("/index", (req, res, next) => {
    res.render('index');
})
app.get("/signin", (req, res, next) => {
    res.render("signin", {data:{}});
})
app.post("/signin", async (req, res, next) => {
    const username = req.body.username;
    let password = req.body.password;
    const retypePassword = req.body.retypePassword;
    if (password != retypePassword) {
        res.send("password retype not match");
        return;
    }

    salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    console.log(username, password);
    try {
        const newUser = await createNewUser(username, password);
        console.log(newUser);
        if (newUser) {
            res.render('login', {data:{createUser:true}});
        } else {
            res.render('signin', {data:{usernameExisted:true}});
        }
    } catch(e) {
        if (e) {
            console.log(e);
        }
    }
})
app.get("/login", (req, res, next) => {
    res.render('login', {data:{}});
})
db.sequelize.authenticate().then((req) => {
    app.listen(PORT, () => {
        console.log("\nlistening to port: " + PORT);
    })
})
