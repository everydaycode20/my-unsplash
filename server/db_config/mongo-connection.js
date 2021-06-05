const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({path: "./.env"});

// const url = process.env.DB_URL; //mongodb localhost connection

const urlAtlas = process.env.DB_ATLAS_URL;// mongodb atlas url

// const connection = mongoose.createConnection(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}); //mongodb localhost connection
const connection = mongoose.connect(urlAtlas, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const imagesSchema = new mongoose.Schema({
    date: Date,
    label: String,
    url: String
});

const Images = mongoose.model("Images", imagesSchema);

const schema = new mongoose.Schema({
    username: String,
    password: String,
    images: [Images.schema]
});

const User = mongoose.model("User", schema);

// module.exports = connection;

exports.Users = User;
exports.Imagess = Images;
exports.Conn = connection;