const dbValidators = require("./db_validators");
const generateJWT = require("./generate_jwt");
const googleVerify = require("./google_verify");
const variousValidators = require("./various_validators");
const uploadFile = require("./upload_file");

module.exports = {
	...dbValidators,
	...generateJWT,
	...googleVerify,
	...variousValidators,
	...uploadFile,
};
