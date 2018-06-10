const mongoose = require("mongoose");
const crypto = require("crypto");
const SECRET = "mykong";
const jwt = require("jsonwebtoken");

const hashPassword = password => {
	return crypto
		.createHmac("sha256", SECRET)
		.update(password)
		.digest("hex");
};

const userSchema = mongoose.Schema(
	{
		username: { type: String },
		password: String
	},
	{ timestamp: true }
);

userSchema.statics.signup = async function(username, password) {
	const prevUser = await this.findOne({ username });
	if (prevUser) {
		const e = new Error(`User ${username} already exists`);
		e.name = "Dup";
		throw e;
	}

	return this.create({
		username,
		password: hashPassword(password)
	});
};

userSchema.statics.createAccessToken = async function(username, password) {
	const user = await this.findOne({ username });
	if (!user) {
		return null;
	}

	if (user.password !== hashPassword(password)) {
		return null;
	}

	return jwt.sign(
		{
			username: user.username
		},
		SECRET
	);
};

userSchema.statics.getUserFromToken = async function(token) {
	try {
		const { username } = jwt.verify(token, SECRET);

		return this.findOne({ username });
	} catch (e) {
		if (e.name === "JsonWebTokenError") {
			return null;
		}
		throw e;
	}
};

module.exports = mongoose.model("User", userSchema);
