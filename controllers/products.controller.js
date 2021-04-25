const {request, response} = require("express");
const {Product} = require("../models");

// Get products - paged - total - populate

/* const getProducts = async (req = request, res = response) => {
	const {limit = 5, offset = 0} = req.body;
	const query = {status: true};

	const [total, categories] = await Promise.all([
		Category.count(query),
		Category.find(query).skip(offset).limit(limit).populate("user", "name"),
	]);

	return res.json({total, categories});
}; */

// Get product - populate{}

/* const getProduct = async (req = request, res = response) => {
	const {id} = req.params;

	const category = await Category.findById(id).populate("user", "name");

	return res.json(category);
}; */

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
	/* getProducts,
	getProduct, */
	createProduct,
	/* updateProduct,
	deleteProduct, */
};
