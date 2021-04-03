const {response, request} = require("express");

const getUsers = (req = request, res = response) => {
	const query = req.query;

	res.status(410).json({msg: "get API controller", query});
};

const putUsers = (req = request, res = response) => {
	const id = req.params.id;
	console.log(id);
	res.json({msg: "put API controller"});
};

const postUsers = (req = request, res = response) => {
	const {name, age} = req.body;
	res.json({msg: "post API controller", name, age});
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
