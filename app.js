const express = require("express");
const app = express();
const env = require("dotenv");
const {Pool} = require("pg");

const poolDB = new Pool({
    host: "localhost",
    database: "aeroBlog",
    user: "postgres",
})
env.config();

const PORT = process.env.PORT;
const connectionString = process.env.DATABASE_URL;
app.listen(PORT, () => {
    console.log("listening to port: " + PORT);
})