const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
	const token = req.headers.authorization || req.query.token;
	const user = await User.getUserFromToken(token);

	if (user) {
		req.user = user;
		//console.log("user:", user);
	}
	next();
};

module.exports = {
	authMiddleware
};
