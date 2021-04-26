const {request, response} = require("express");
const {Category, Product, User, Role} = require("../models");
const {ObjectId} = require("mongoose").Types;

const allowedCollections = ["categories", "products", "roles", "users"];

const searchUsers = async (term = "", res = response) => {
	const isMongoId = ObjectId.isValid(term);

	if (isMongoId) {
		const user = await User.findById(term);
		return res.json({results: user ? [user] : []});
	}

	const regex = new RegExp(term, "i"); // i = insensitive
	const [users, total] = await User.find({
		$or: [{name: regex}, {email: regex}],
		status: true,
	});
	return res.json({results: users ? users : []});
};

const search = async (req = request, res = response) => {
	const {collection, term} = req.params;

	if (!allowedCollections.includes(collection)) {
		res.status(400).json({message: `Invalid collecion ${collection}`});
	}

	switch (collection) {
		case "categories":
			const categories = await Category.find({name: term});
			res.json(categories);
			break;
		case "products":
			const products = await Product.find({name: term});
			res.json(products);
			break;
		case "roles":
			const roles = await Role.find({name: term});
			res.json(roles);
			break;
		case "users":
			searchUsers(term, res);
			break;
		default:
			res.status(500).json({message: `I forgot include the ${collection} collection`});
	}
};

module.exports = {
	search,
};
