const mongoose = require("mongoose");
const Post = require("./Post");
const User = require("./User");
mongoose.set("debug",true)
mongoose.connect("mongodb://192.168.21.98:27017/react_training");
const db = mongoose.connection;

db.once("open", function() {
	console.log("db ok");
});

module.exports = { Post, User };
