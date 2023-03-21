module.exports = {
    getUserByUsername,
    createNewUser,
    checkAuth,
    getAllReviewsByUsername,
    addNewReview
}
const db = require("./models");
const {users, reviews} = require("./models");

function getUserByUsername(userName) {
    user = users.findOne({where: {username:userName}});
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

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login");
}

function getAllReviewsByUsername(username) {
    const review = reviews.findAll({where:{users_username: username}});
    return review;
}

function addNewReview(title, body, rating, image, users_username) {
    console.log(body);
    reviews.create({title, body, rating, image, users_username});
    return reviews;
}