const {request, response} = require("express");
const {Category} = require("../models");

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

module.exports = {
	createCategory,
};
