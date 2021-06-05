module.exports.isAuth = (req, res, next) =>{
    if (req.isAuthenticated()) {
        next();
    }
    else{
        res.status(200).json({"status": false,"message": "user not logged in"});
    }
}
