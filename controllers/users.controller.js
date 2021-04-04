const {response, request} = require("express");
const bcriptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
	let {limit, from} = req.query;
	limit = Number(limit);
	from = Number(from);

	if (!isValidNumber(limit)) limit = 5;
	if (!isValidNumber(from)) from = 0;
	const users = await User.find().skip(from).limit(limit);

	res.json({users, items: users.length});
};

const putUsers = async (req = request, res = response) => {
	const {id} = req.params;
	const {_id, password, google, email, ...rest} = req.body;

	// TODO: validate with database
	if (password) {
		// Encrypt password
		const salt = bcriptjs.genSaltSync();
		rest.password = bcriptjs.hashSync(password, salt);
	}

	const user = await User.findByIdAndUpdate(id, rest);

	res.json(user);
};

const postUsers = async (req = request, res = response) => {
	const {name, email, password, role} = req.body;
	const user = new User({
		name,
		email,
		password,
		role,
	});

	// Encrypt password
	const salt = bcriptjs.genSaltSync();
	user.password = bcriptjs.hashSync(password, salt);

	// Save on database
	await user.save();

	res.json({user});
};

const deleteUsers = (req = request, res = response) => {
	res.json({msg: "delete API controller"});
};

const isValidNumber = (number, positive = true) => {
	const negativeCase = positive ? number < 0 : false;

	return !(isNaN(number) || negativeCase);
};

module.exports = {
	getUsers,
	putUsers,
	postUsers,
	deleteUsers,
};
