const express = require("express");
const app = express();
const env = require("dotenv");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const db = require("./models");
const passport = require("passport");
const initializePassport = require("./passport-config");
const {
    createNewUser,
    checkAuth,
    getAllReviewsByUsername,
    addNewReview,
    getReviewById,
    updateReviewById,
    getAllReview,

} = require("./utils");
const session = require("express-session");
env.config();
const PORT = process.env.PORT;
const connectionString = process.env.DATABASE_URL;
const multer = require("multer");
const { profile } = require("console");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});
app.use(bodyParser.urlencoded({
    extended: true
  }));

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
app.get("/home", (req, res, next) => {
    if (req.user != null) {
        res.render('home', {data:{user:req.user}});
    } else {
        res.render('home', {data:{}});
    }
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
            res.render("home", {data:{created: true}})
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
  res.redirect('/profile');
});

app.get("/profile", checkAuth,async (req, res, next) => {
    res.render("profile", {data:{username: req.user.username, reviews:await getAllReviewsByUsername(req.user.username)}});
})

app.get("/add", checkAuth, (req, res, next) => {
    res.render("add");
})

app.post("/add", upload.single('img'),  (req, res, next) => {
    if (req.body.path === undefined) {req.body.path = null};
    addNewReview(req.body.title, req.body.body, req.body.rating, req.body.path, req.user.username);
    res.redirect("/profile");
})
let count = [];
app.get("/edit", checkAuth, async (req, res, next) => {
    count.push(req.query.id);
    const review = await getReviewById(req.query.id);
    res.render("edit", {data: {
        title: review.title,
        body: review.body,
        rating: review.rating,
        id: req.query.id
    }});
})

app.post("/edit",upload.single('img'), async (req, res, next) => {
    console.log(req.body, "\n\n");
    await updateReviewById(req.body.id,req.body.title, req.body.body, req.body.rating)
    res.redirect("/profile");
});

app.get("/reviews", async (req, res, next) => {
    reviews = await getAllReview();
    res.render("reviews", {data:{reviews:reviews}});
})

db.sequelize.authenticate().then((req) => {
    app.listen(PORT, () => {
        console.log("\nlistening to port: " + PORT);
    })
})
