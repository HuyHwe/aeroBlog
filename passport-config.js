const {users} = require("./models");
const LocalStrategy = require("passport-local").Strategy;
const {getUserByUsername} = require("./utils");
const bcrypt = require("bcrypt");
function initializePassport(passport) {
    passport.use(new LocalStrategy(
        async function(username, password, done) {
            let match
            const user = await getUserByUsername(username);
            if (!user) {
                return done(null, false);
            }
            try {
                bcrypt.compare(password, user.password, (e, valid) => {
                    if (e) {
                        return console.log(e);
                    } else if (valid) {
                        return done(null, user);
                    }
                });
            } catch(e) {
                if (e) {
                    console.log(e);
                }
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });
    
    passport.deserializeUser(async (username, done) => {
        const user = await users.findOne({where: {username:username}});
        done(null,user);
    });
    
    
}

module.exports = initializePassport;