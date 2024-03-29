const {Category, Product} = require("../models");
const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
	const roleExists = await Role.findOne({role});
	if (!roleExists) {
		throw new Error(`${role} is not a valid role.`);
	}
};

const emailExists = async (email = "") => {
	const emailExists = await User.findOne({email});
	if (emailExists) {
		throw new Error(`Email ${email} already exists.`);
	}
};

const categoryExists = async (id) => {
	const categoryExists = await Category.findById(id);

	if (!categoryExists) {
		throw new Error(`Category with Id = ${id} does not exists.`);
	}
};

const productExists = async (id) => {
	const productExists = await Product.findById(id);

	if (!productExists) {
		throw new Error(`Product with Id = ${id} does not exists.`);
	}
};

const userExistsById = async (id) => {
	const userExists = await User.findById(id);
	if (!userExists) {
		throw new Error(`User with ID: ${id} doesn't exists.`);
	}
};

const validCollections = (collection, allowed = []) => {
	const validCollection = allowed.includes(collection);
	if (!validCollection) {
		throw new Error(`${collection} collection is invalid. ${allowed}`);
	}

	return true;
};

module.exports = {
	isValidRole,
	emailExists,
	userExistsById,
	categoryExists,
	productExists,
	validCollections,
};
