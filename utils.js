module.exports = {
    getUserByUsername,
    createNewUser,
    checkAuth,
    getAllReviewsByUsername,
    addNewReview,
    getReviewById,
    updateReviewById,
    getAllReview
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
    reviews.create({title, body, rating, image, users_username});
    return reviews;
}

function getReviewById(id) {
    const review = reviews.findByPk(id);
    return review;
}

function updateReviewById(id, title, body, rating) {
    const updatedReview = reviews.update({title, body, rating}, {
        where: {id}
    });
    return updatedReview;
}

async function getAllReview() {
    const allReviews = await reviews.findAll();
    let shuffledReviews = allReviews.map(review => review);
    shuffle(shuffledReviews);
    return shuffledReviews;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  