const {Router} = require("express");
const {check} = require("express-validator");
const {loadFile, updateImage, showImage} = require("../controllers/uploads.controller");
const {validCollections} = require("../helpers");

const {validateFields, validateFile} = require("../middlewares");

const router = Router();

router.post("/", validateFile, loadFile);

router.put(
	"/:collection/:id",
	[
		validateFile,
		check("id", "Invalid id").isMongoId(),
		check("collection").custom((c) => validCollections(c, ["users", "products"])),
		validateFields,
	],
	updateImage
);

router.get(
	"/:collection/:id",
	[
		check("id", "Invalid id").isMongoId(),
		check("collection").custom((c) => validCollections(c, ["users", "products"])),
		validateFields,
	],
	showImage
);

module.exports = router;
