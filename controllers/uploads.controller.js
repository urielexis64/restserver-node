const {request, response} = require("express");
const {uploadFile} = require("../helpers");
const path = require("path");
const {User, Product} = require("../models");
const fs = require("fs");

const loadFile = async (req = request, res = response) => {
	try {
		const filename = await uploadFile(req.files, ["txt", "md"], "text files");

		res.json({filename});
	} catch (msg) {
		res.status(400).json({msg});
	}
};

const updateImage = async (req = request, res = response) => {
	const {collection, id} = req.params;

	let model;

	switch (collection) {
		case "users":
			model = await User.findById(id);
			if (!model) {
				return res.status(400).json({msg: `There is no user with the id ${id}`});
			}
			break;
		case "products":
			model = await Product.findById(id);
			if (!model) {
				return res.status(400).json({msg: `There is no product with the id ${id}`});
			}
			break;
		default:
			res.status(500).json({msg: "I forgot to validate this."});
	}

	// Clear previous images
	try {
		if (model.img) {
			const imagePath = path.join(__dirname, "../uploads/", collection, model.img);
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath);
			}
		}

		const filename = await uploadFile(req.files, undefined, collection);
		model.img = filename;

		await model.save();

		res.json(model);
	} catch (error) {
		res.status(400).json({error});
	}
};

module.exports = {
	loadFile,
	updateImage,
};
