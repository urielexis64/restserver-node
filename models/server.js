const express = require("express");
const cors = require("cors");
const {dbConnection} = require("../db/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usersPath = "/api/users";

		// Connect to DB
		this.dbConnect();

		// Middlewares
		this.middlewares();

		//Application routes
		this.routes();
	}

	async dbConnect() {
		await dbConnection();
	}

	middlewares() {
		// CORS
		this.app.use(cors());

		// Parse and read body
		this.app.use(express.json());

		// Public directory
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.usersPath, require("../routes/user.routes"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening at http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
