const express = require("express");
const app = express();
const env = require("dotenv");
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
const {user, review} = require("./models");
env.config();
const PORT = process.env.PORT;
const connectionString = process.env.DATABASE_URL;
app.use(bodyParser.urlencoded({extended: false}));
app.post("/sign-in", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);

    try {
        const newUser = await user.create({username, password, description: "123123"});
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
