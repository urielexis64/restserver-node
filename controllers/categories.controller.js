const {request, response} = require("express");
const {Category} = require("../models");

// Get categories - paged - total - populate

const getCategories = async (req = request, res = response) => {
	const {limit = 2, offset = 0} = req.body;
	const query = {status: true};

	const [total, categories] = await Promise.all([
		Category.count(query),
		Category.find(query).skip(offset).limit(limit).populate("user", "name"),
	]);

	return res.json({total, categories});
};

// Get category - populate{}

const getCategory = async (req = request, res = response) => {
	const {id} = req.params;

	const category = await Category.findById(id).populate("user", "name");

	return res.json(category);
};

const createCategory = async (req = request, res = response) => {
	const name = req.body.name.toUpperCase();

	const categoryDB = await Category.findOne({name});

	if (categoryDB) {
		return res.status(400).json({message: `Category ${name} already exists.`});
	}

	// Generate data to save
	const data = {
		name,
		user: req.user._id,
	};
	const category = new Category(data);

	// Save on DB
	await category.save();
	res.status(201).json(category);
};

// Update category

const updateCategory = async (req = request, res = response) => {
	const {id} = req.params;
	let {status, user, ...data} = req.body;

	data.nombre = data.nombre.toUpperCase();
	data.user = req.user._id;

	if (!data) {
		return res.status(400).json({message: "Missing body."});
	}

	const category = await Category.findByIdAndUpdate(id, data, {new: true});

	return res.json(category);
};

// Delete category (status: false)

module.exports = {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
};
