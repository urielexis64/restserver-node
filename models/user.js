const {Schema, model} = require("mongoose");

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, "name is required"],
	},
	email: {
		type: String,
		required: [true, "email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "password is required"],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.toJSON = function () {
	const {__v, _id, password, ...user} = this.toObject();
	user.uid = _id;
	return user;
};

module.exports = model("User", UserSchema);
