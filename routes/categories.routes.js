const {Router, request, response} = require("express");
const {check} = require("express-validator");

const {validateJWT} = require("../middlewares/validate_jwt");
const {validateFields} = require("../middlewares/validate_fields");
const {createCategory} = require("../controllers/categories.controller");

const router = Router();

// Get all categories - public
router.get("/", (req = request, res = response) => {
	res.json({msg: "get"});
});

// Get category by id - public
router.get("/:id", (req = request, res = response) => {
	res.json({msg: "get id"});
});

// Create category by id - private - any role
router.post(
	"/",
	[validateJWT, check("name", "Cateogry name is required.").not().isEmpty(), validateFields],
	createCategory
);

// Update category by id - private - any role
router.put("/:id", (req = request, res = response) => {
	res.json({msg: "put"});
});

// Delete category by id - private - admin role
router.delete("/:id", (req = request, res = response) => {
	res.json({msg: "delete"});
});

module.exports = router;
