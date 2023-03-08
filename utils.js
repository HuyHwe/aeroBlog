module.exports = {getUserByUsername}
const db = require("./models");
const {users} = require("./models");
function getUserByUsername(userName) {
    user = users.find({where: {username:userName}});
    return user;
    console.log(user);
}

users.create({username:"huy", password:"30102004"})