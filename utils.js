module.exports = {
    getUserByUsername,
    createNewUser
}
const db = require("./models");
const {users} = require("./models");

function getUserByUsername(userName) {
    user = users.findOne({where: {username:userName}});
    console.log(user);
    return user;
}

async function createNewUser(username, password) {
    checkForUsername = await users.findOne({where: {username:username}});
    if (checkForUsername || username==null) {
        return false;
    } else {
        user = await users.create({username, password});
        return user;
    }
}