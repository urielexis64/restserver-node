const {request, response} = require("express");
const {isValidNumber} = require("../helpers/various_validators");
const {Product} = require("../models");

// Get products - paged - total - populate

const getProducts = async (req = request, res = response) => {
	let {limit = 5, offset = 0} = req.query;
	const query = {status: true};

	if (isValidNumber(limit)) limit = parseInt(limit);
	else limit = 5;
	if (isValidNumber(offset)) offset = parseInt(offset);
	else offset = 0;

	const [total, products] = await Promise.all([
		Product.countDocuments(query),
		Product.find(query)
			.skip(offset)
			.limit(limit)
			.populate("user", "name")
			.populate("category", "name"),
	]);

	return res.json({total, products});
};

// Get product - populate{}

const getProduct = async (req = request, res = response) => {
	const {id} = req.params;

	const product = await Product.findById(id)
		.populate("user", "name")
		.populate("category", "name");

	return res.json(product);
};

const createProduct = async (req = request, res = response) => {
	const {status, available, ...rest} = req.body;

	const productDB = await Product.findOne({name: rest.name});

	if (productDB) {
		return res.status(400).json({message: `Product ${rest.name} already exists.`});
	}

	// Generate data to save
	const data = {
		...rest,
		user: req.user._id,
	};
	const product = new Product(data);

	// Save on DB
	await product.save({new: true});
	res.status(201).json(product);
};

// Update product

/* const updateProduct = async (req = request, res = response) => {
	const {id} = req.params;
	let {status, user, ...data} = req.body;

	data.name = data.name.toUpperCase();
	data.user = req.user._id;

	if (!data) {
		return res.status(400).json({message: "Missing body."});
	}

	const category = await Category.findByIdAndUpdate(id, data, {new: true});

	return res.json(category);
};
 */
// Delete product (status: false)
/* const deleteProduct = async (req = request, res = response) => {
	const {id} = req.params;
	const deletedCategory = await Category.findByIdAndUpdate(id, {status: false}, {new: true});
	return res.json(deletedCategory);
}; */

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	/* updateProduct,
	deleteProduct, */
};
