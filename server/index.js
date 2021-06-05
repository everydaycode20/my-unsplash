const express = require("express");
const app = express();

const path = require("path");

const crypto = require("crypto");

var cors = require('cors');

const helmet = require("helmet");

const nocache = require('nocache')

const session = require("express-session");
const MongoStore = require('connect-mongo');

const passport = require("passport");

const dotenv = require("dotenv");

dotenv.config({path: "./.env"});

// const connection = require("./db_config/mongo-connection").Conn; //mongodb localhost

const routes = require("./routes/routes");

app.use(cors());

const nonce = crypto.randomBytes(16).toString('base64');

// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'", "my-unsplash-react.herokuapp.com"],
//             fontSrc: ["'self'", "fonts.gstatic.com"],
//             imgSrc: ["'self'", `'nonce-${nonce}'`, "https:"],
//             scriptSrc: ["'self'", "my-unsplash-react.herokuapp.com", `'nonce-${nonce}'`],
//             styleSrc: ["'self'", "fonts.googleapis.com"],
//             frameSrc: ["'self'"],
//             frameAncestors: ["'self'"],
//             formAction: ["'self'"],
//         }
//     },
//     hsts: {
//         maxAge: 31536000,
//         preload: true,
//         includeSubDomains: true
//     },
//     permittedCrossDomainPolicies: {
//         permittedPolicies: "master-only"
//     }
// }));

// app.disable('x-powered-by');

// app.use(nocache());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    proxy: true,
    secret: process.env.SECRET_SESSION,
    name: "session_my-unsplash",
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create(connection, {useNewUrlParser: true, useUnifiedTopology: true}), //mongodb localhost
    store: MongoStore.create({mongoUrl: process.env.DB_ATLAS_URL}),    
    cookie: {
        maxAge: 1000 * 60 * 60 * 4,
        // sameSite: "lax",
        // secure: true,
        // httpOnly: true,
    }
}));


require("./passport-config/strategy");
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(express.static("build"));

app.get("/*", cors(), function(req, res, next) {
    res.sendFile(path.join(__dirname, "build/index.html"), function(err){
        if (err) {
            res.status(500).send(err)
        }
        next();
    });
    
});

const port = process.env.PORT || 8081;

app.listen(port, () =>{
    console.log(`server listening on port ${port}\nlocalhost:${port}`);
});
