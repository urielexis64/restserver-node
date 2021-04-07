const {response} = require("express");
const bcriptjs = require("bcryptjs");

const User = require("../models/user");

const login = async (req, res = response) => {
	const {email, password} = req.body;

	try {
		// Verify if email exists
		const user = await User.findOne({email});
		if (!user) {
			return res.status(400).json({
				message: "Email incorrect.",
			});
		}

		// Verify if user is active
		if (!user.status) {
			return res.status(400).json({
				message: "Email or password are not correct. status",
			});
		}

		// Verify password
		const validPassword = bcriptjs.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				message: "Password incorrect.",
			});
		}

		// Generate JWT

		res.json({
			message: "Login OK",
			email,
			password,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Something went wrong...",
		});
	}
};

module.exports = {
	login,
};
