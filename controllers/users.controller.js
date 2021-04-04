const {response, request} = require("express");
const bcriptjs = require("bcryptjs");

const {isValidNumber} = require("../helpers/various_validators");
const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
	let {limit, from} = req.query;
	const query = {status: true};
	limit = Number(limit);
	from = Number(from);

	if (!isValidNumber(limit)) limit = 5;
	if (!isValidNumber(from)) from = 0;

	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).skip(from).limit(limit),
	]);

	res.json({total, users});
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

const deleteUsers = async (req = request, res = response) => {
	const {id} = req.params;

	// Physically delete from database
	// const user = await User.findByIdAndDelete(id);

	const user = await User.findByIdAndUpdate(id, {status: false});

	res.json({msg: "User deleted succesfully.", user});
};

module.exports = {
	getUsers,
	putUsers,
	postUsers,
	deleteUsers,
};
