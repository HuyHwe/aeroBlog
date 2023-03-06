const express = require("express");
const app = express();
const env = require("dotenv");
// const {Pool} = require("pg");
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
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


db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log("\nlistening to port: " + PORT);
    })
})
