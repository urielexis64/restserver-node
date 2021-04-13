const {response, request} = require("express");
const bcriptjs = require("bcryptjs");

const User = require("../models/user");
const {generateJWT} = require("../helpers/generate_jwt");
const {googleVerify} = require("../helpers/google_verify");

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
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Something went wrong...",
		});
	}
};

const googleSignIn = async (req = request, res = response) => {
	const {id_token} = req.body;

	try {
		const {name, email, img} = await googleVerify(id_token);

		let user = await User.findOne({email});

		// If user does not exists, we have to create it
		if (!user) {
			const newUser = new User({
				name,
				email,
				password: "a",
				img,
				google: true,
			});
			await newUser.save();
		}

		// If user is blocked (status: false)
		if (!user.status) {
			return res.status(401).json({message: "User blocked. Please, contact an admin."});
		}

		// Generate JWT
		const token = await generateJWT(user.id);

		res.json({
			message: "All OK. Google SignIn",
			token,
		});
	} catch (error) {
		res.status(400).json({
			message: "Invalid Google Token",
		});
	}
};

module.exports = {
	login,
	googleSignIn,
};
