const path = require("path");
const {request, response} = require("express");

const uploadFile = async (req = request, res = response) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
		res.status(400).json({message: "No files were uploaded."});
		return;
	}

	const {file} = req.files;
	const cutName = file.name.split(".");
	const extension = cutName[cutName.length - 1];

	// Validating extension
	const validExtensions = ["png", "jpg", "jpeg", "gif"];

	if (!validExtensions.includes(extension)) {
		res.status(400).json({msg: `Invalid file extension. ${extension}. (${validExtensions})`});
	}

	const uploadPath = path.join(__dirname, "../uploads/", file.name);

	file.mv(uploadPath, (err) => {
		if (err) {
			return res.status(500).json({err});
		}

		res.json({message: "File uploaded to " + uploadPath});
	});
};

module.exports = {
	uploadFile,
};
