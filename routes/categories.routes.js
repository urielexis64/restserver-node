const {Router, request, response} = require("express");
const {check} = require("express-validator");

const {categoryExists} = require("../helpers/db_validators");

const {validateJWT} = require("../middlewares/validate_jwt");
const {validateFields} = require("../middlewares/validate_fields");
const {
	createCategory,
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
} = require("../controllers/categories.controller");
const {isAdminRole} = require("../middlewares");

const router = Router();

// Get all categories - public
router.get("/", getCategories);

// Get category by id - public
router.get(
	"/:id",
	[check("id", "Id invalid.").isMongoId(), check("id").custom(categoryExists), validateFields],
	getCategory
);

// Create category by id - private - any role
router.post(
	"/",
	[validateJWT, check("name", "Category name is required.").not().isEmpty(), validateFields],
	createCategory
);

// Update category by name - private - any role
router.put(
	"/:id",
	[
		validateJWT,
		check("name", "Name is required").not().isEmpty(),
		check("id").custom(categoryExists),
		validateFields,
	],
	updateCategory
);

// Delete category by id - private - admin role
router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "Invalid ID").isMongoId(),
		check("id").custom(categoryExists),
		validateFields,
	],
	deleteCategory
);

module.exports = router;
