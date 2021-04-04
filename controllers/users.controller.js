const {response, request} = require("express");
const bcriptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
	const query = req.query;

	res.status(410).json({msg: "get API controller", query});
};

const putUsers = (req = request, res = response) => {
	const id = req.params.id;
	console.log(id);
	res.json({msg: "put API controller"});
};

const postUsers = async (req = request, res = response) => {
	const {name, email, password, role} = req.body;
	const user = new User({
		name,
		email,
		password,
		role,
	});

	// Verify if email exists
	const emailExists = await User.findOne({email});
	if (emailExists) {
		return res.status(400).json({
			message: "Email already exists.",
		});
	}

	// Encrypt password
	const salt = bcriptjs.genSaltSync();
	user.password = bcriptjs.hashSync(password, salt);

	// Save on database
	await user.save();

	res.json({msg: "post API controller", user});
};

const deleteUsers = (req = request, res = response) => {
	res.json({msg: "delete API controller"});
};

module.exports = {
	getUsers,
	putUsers,
	postUsers,
	deleteUsers,
};
