const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// const connection = require("../db_config/mongo-connection"); //mongodb localhost
const User = require("../db_config/mongo-connection").Users;//mongodb atlas

const comparePassword = require("../utils/compare-password").comparePassword;

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username: username}).then(user => {
        if (!user) {
            done(null, false);
        }
        else{
            comparePassword(password, user.password).then(isValid => {
                if (isValid) {
                    done(null, user);
                }
                else{
                    done(null, false);
                }
            });
        }
    }).catch(err => done(err));
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then(user => done(null, user)).catch(err => done(err));
});