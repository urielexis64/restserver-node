const validateFields = require("../middlewares/validate_fields");
const validateJWT = require("../middlewares/validate_jwt");
const validateRoles = require("../middlewares/validate_role");

module.exports = {
	...validateFields,
	...validateJWT,
	...validateRoles,
};
