const {response, request} = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({message: "token is required"});
	}

	try {
		const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		const user = await User.findById(uid);

		if (!user) {
			return res.status(400).json({
				message: "Invalid token - user doesnt exists",
			});
		}

		// Verify if uid is an active user
		if (!user.status) {
			return res.status(401).json({
				message: "Invalid token - user is inactive",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			message: "Invalid token",
		});
	}
};

module.exports = {
	validateJWT,
};
