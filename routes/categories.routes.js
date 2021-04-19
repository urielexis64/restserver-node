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
} = require("../controllers/categories.controller");

const router = Router();

// Get all categories - public
router.get("/", getCategories);

// Get category by id - public
router.get(
	"/:id",
	[
		check("id", "Id invalid.").not().isEmpty(),
		check("id").custom(categoryExists),
		validateFields,
	],
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
		check("id", "ID is required").not().isEmpty(),
		check("id").custom(categoryExists),
		validateFields,
	],
	updateCategory
);

// Delete category by id - private - admin role
router.delete("/:id", (req = request, res = response) => {
	res.json({msg: "delete"});
});

module.exports = router;
