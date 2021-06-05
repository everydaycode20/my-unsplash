const {RateLimiterMongo} = require('rate-limiter-flexible');
const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config({path: "./.env"});

const urlAtlas = process.env.DB_ATLAS_URL;

const connection = mongoose.createConnection(urlAtlas, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const rateLimiterMongo = new RateLimiterMongo({
    storeClient: connection,
    points: 10,
    duration: 1,
    keyPrefix: "rateLimiter",
    blockDuration: 120
});

const rateLimiterMiddleware = (req, res, next) =>{
    rateLimiterMongo.consume(req.ip).then(() => {
        
        next();
    }).catch(() => {
        console.log("exceeded");
        res.status(429).json({type: false, message: "too many requests"});
    });
}

module.exports = rateLimiterMiddleware;