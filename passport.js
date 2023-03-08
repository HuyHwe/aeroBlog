const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const {getUserByUsername} = require("utils");
passport.use(new LocalStrategy(
    function(username, password,done) {
        const user = getUserByUsername(username);
        if (!user) {
            return done(null, false);
        }
        try {
            const match = bcrypt.compare(password, user.password);
        } catch(e) {
            if (e) {
                console.log(e);
            }
        }

        if (match === true) {
            return done(null, user);
        } else if (match === false) {
            return done(null, false);
        }
    }
))