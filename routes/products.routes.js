const {Router, request, response} = require("express");
const {check} = require("express-validator");

const {categoryExists, productExists} = require("../helpers/db_validators");

const {validateJWT} = require("../middlewares/validate_jwt");
const {validateFields} = require("../middlewares/validate_fields");
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/products.controller");
const {isAdminRole} = require("../middlewares");

const router = Router();

// Get all products - public
router.get("/", getProducts);

// Get product by id - public
router.get(
	"/:id",
	[check("id", "Id invalid.").isMongoId(), check("id").custom(productExists), validateFields],
	getProduct
);

// Create product by id - private - any role
router.post(
	"/",
	[
		validateJWT,
		check("name", "Product name is required.").not().isEmpty(),
		check("category", "Category ID invalid").isMongoId(),
		check("category").custom(categoryExists),
		validateFields,
	],
	createProduct
);

// Update product by name - private - any role
router.put("/:id", [validateJWT, check("id").custom(productExists), validateFields], updateProduct);

// Delete product by id - private - admin role
router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "Invalid ID").isMongoId(),
		check("id").custom(productExists),
		validateFields,
	],
	deleteProduct
);

module.exports = router;
