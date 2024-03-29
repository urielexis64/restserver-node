const {Router} = require("express");
const {check} = require("express-validator");

const {validateFields, validateJWT, hasRole, isAdminRole} = require("../middlewares");

const {isValidRole, emailExists, userExistsById} = require("../helpers/db_validators");
const {getUsers, putUsers, postUsers, deleteUsers} = require("../controllers/users.controller");

const router = Router();

router.get("/", getUsers);
router.put(
	"/:id",
	[
		check("id", "Invalid id param.").isMongoId().custom(userExistsById),
		check("role").custom(isValidRole),
		validateFields,
	],
	putUsers
);

router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email").isEmail().custom(emailExists),
		check("password", "Password must be 6 or more characters.").isLength({min: 6}),
		check("role").custom(isValidRole),
		validateFields,
	],
	postUsers
);

router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		hasRole("ADMIN_ROLE", "SALES_ROLE"),
		check("id", "Invalid id param.").isMongoId().custom(userExistsById),
		validateFields,
	],
	deleteUsers
);

module.exports = router;
