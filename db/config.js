const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_ATLAS, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log("DB ONLINE");
	} catch (error) {
		console.log(error);
		throw new Error("DB Connection error");
	}
};

module.exports = {
	dbConnection,
};
