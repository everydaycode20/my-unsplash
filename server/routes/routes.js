const router = require("express").Router();

const passport = require("passport");

const isAuth = require("../utils/isAuth").isAuth;

// const connection = require("../db_config/mongo-connection");
// const User = connection.models.User;
// const Images = connection.models.Images;
const User = require("../db_config/mongo-connection").Users;
const Images = require("../db_config/mongo-connection").Imagess;

const bcrypt = require("bcrypt");

router.post("/login", passport.authenticate("local", {failureRedirect: "/failed"}), (req, res, next) =>{
    
    res.status(200).json({"status": true,"message": "user logged in"});
});

router.get("/failed", (req, res, next) =>{
    res.json({"status": false, "message": "failed login"});
});

router.get("/user", isAuth, (req, res, next) =>{
    res.status(200).json({"status": true,"message": "user logged in"});
});

router.get("/logout", (req, res, next) => {
    req.logOut();
    res.json({"status": false, "message": "user logged out"});
});

router.get("/images", isAuth, (req, res, next) => {
    const {images} = req.user;

    res.json({"images": images});
});

router.post("/add", isAuth, (req, res, next) => {
    const {label, url} = req.body;
    User.findById(req.user.id).then(user => {
        const newImage = new Images({
            date: new Date(),
            label: label,
            url: url
        });
        user.images.push(newImage);
        user.save();
    }).catch(err => console.log(err));

    res.json({"status": true, "message": "image uploaded"});
});

router.post("/register", async(req, res, next) =>{
    const {username, password, confirmPassword} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 8);
    
    if (password !== confirmPassword) {
        
        res.json({"message": "both password must match"});
    }
    else{
        User.findOne({username: username}).then(user => {
            if (!user) {
                const newUser = new User({
                    username: username,
                    password: encryptedPassword
                });

                newUser.save().then(user =>{
                }).catch(err => console.log(err));
                res.json({"status": true,"message": "user registered"});
            }
            else{
                res.json({"status": false, "message": "username taken"});
            }
        });
    }

});

router.post("/delete", isAuth, (req, res, next) =>{
    const {imageId} = req.body;

    User.findById(req.user.id).then(result => {
        result.images.id(imageId).remove((delErr, delRes) => {
            if (delErr) {
                console.log(delErr);
            }
        });
        result.markModified("images");
        result.save().then(user => {
            res.json({"status": true, "message": "image deleted"});
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

module.exports = router;