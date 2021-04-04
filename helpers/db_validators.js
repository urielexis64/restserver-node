const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
	const roleExists = await Role.findOne({role});
	if (!roleExists) {
		throw new Error(`${role} is not a valid role.`);
	}
};

const emailExists = async (email = "") => {
	const emailExists = await User.findOne({email});
	if (emailExists) {
		throw new Error(`Email ${email} already exists.`);
	}
};

module.exports = {
	isValidRole,
	emailExists,
};
