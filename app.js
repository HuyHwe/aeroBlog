const express = require("express");
const app = express();
const env = require("dotenv");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const db = require("./models");
const {users, reviews} = require("./models");
const passport = require("passport");
const initializePassport = require("./passport-config");
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
initializePassport(passport);
// Trang đầu
app.get("/index", (req, res, next) => {
    res.render('index', {data:{}});
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
    try {
        const newUser = await createNewUser(username, password);
        console.log(newUser);
        if (newUser) {
            res.render("index", {data:{created: true}})
        } else {
            res.render('signin', {data:{usernameExisted:true}});
        }
    } catch(e) {
        if (e) {
            console.log(e);
        }
    }
},)
app.get("/login", (req, res, next) => {
    res.render('login', {data:{}});
})
app.post("/login",  passport.authenticate('local', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/index');
});


db.sequelize.authenticate().then((req) => {
    app.listen(PORT, () => {
        console.log("\nlistening to port: " + PORT);
    })
})
