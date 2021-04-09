const {request, response} = require("express");

const isAdminRole = async (req = request, res = response, next) => {
	if (!req.user) {
		return res.status(500).json({
			message: "You want to verify role without validate token first",
		});
	}

	const {role, name} = req.user;
	if (role !== "ADMIN_ROLE") {
		return res.status(401).json({
			message: `${name} is not an admin.`,
		});
	}

	next();
};

const hasRole = (...roles) => {
	return (req = request, res = response, next) => {
		if (!req.user) {
			return res.status(500).json({
				message: "You want to verify role without validate token first",
			});
		}
		const {role} = req.user;
		if (!roles.includes(role)) {
			return res.status(401).json({
				message: `The service requires some of these roles: ${roles}`,
			});
		}
		next();
	};
};

module.exports = {
	isAdminRole,
	hasRole,
};
