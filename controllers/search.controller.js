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
	const query = {
		$or: [{name: regex}, {email: regex}],
		status: true,
	};

	const [users, total] = await Promise.all([User.find(query), User.countDocuments(query)]);
	return res.json({results: users ? users : [], total});
};

const searchCategories = async (term = "", res = response) => {
	const isMongoId = ObjectId.isValid(term);

	if (isMongoId) {
		const category = await Category.findById(term);
		return res.json({results: category ? [category] : []});
	}

	const regex = new RegExp(term, "i"); // i = insensitive
	const query = {name: regex, status: true};

	const [categories, total] = await Promise.all([
		Category.find(query).populate("user", "name"),
		Category.countDocuments(query),
	]);
	return res.json({results: categories ? categories : [], total});
};

const searchProducts = async (term = "", res = response) => {
	const isMongoId = ObjectId.isValid(term);

	if (isMongoId) {
		const product = await Product.findById(term);
		return res.json({results: product ? [product] : []});
	}

	const regex = new RegExp(term, "i"); // i = insensitive
	const query = {name: regex, status: true};

	const [products, total] = await Promise.all([
		Product.find(query).populate("category", "name"),
		Product.countDocuments(query),
	]);
	return res.json({results: products ? products : [], total});
};

const searchRoles = async (term = "", res = response) => {
	const isMongoId = ObjectId.isValid(term);

	if (isMongoId) {
		const role = await Role.findById(term);
		return res.json({results: role ? [role] : []});
	}

	const regex = new RegExp(term, "i"); // i = insensitive
	const query = {name: regex};

	const [roles, total] = await Promise.all([Role.find(query), Role.countDocuments(query)]);
	return res.json({results: roles ? roles : [], total});
};

const search = async (req = request, res = response) => {
	const {collection, term} = req.params;

	if (!allowedCollections.includes(collection)) {
		res.status(400).json({message: `Invalid collecion ${collection}`});
	}

	switch (collection) {
		case "categories":
			searchCategories(term, res);
			break;
		case "products":
			searchProducts(term, res);
			break;
		case "roles":
			searchRoles(term, res);
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
