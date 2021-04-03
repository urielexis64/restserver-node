const {response} = require("express");

const getUsers = (req, res = response) => {
	res.status(410).json({msg: "get API controller"});
};

const putUsers = (req, res = response) => {
	res.json({msg: "put API controller"});
};

const postUsers = (req, res = response) => {
	res.json({msg: "post API controller"});
};

const deleteUsers = (req, res = response) => {
	res.json({msg: "delete API controller"});
};

module.exports = {
	getUsers,
	putUsers,
	postUsers,
	deleteUsers,
};
