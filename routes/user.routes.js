const {Router} = require("express");
const {check} = require("express-validator");

const {validateFields} = require("../middlewares/validate_fields");
const {getUsers, putUsers, postUsers, deleteUsers} = require("../controllers/users.controller");

const router = Router();

router.get("/", getUsers);
router.put("/:id", putUsers);
router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Invalid email").isEmail(),
		check("password", "Password must be 6 or more characters.").isLength({min: 6}),
		check("role", "It is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		validateFields,
	],
	postUsers
);
router.delete("/", deleteUsers);

module.exports = router;
