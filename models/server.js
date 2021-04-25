const express = require("express");
const cors = require("cors");
const {dbConnection} = require("../db/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			auth: "/api/auth",
			users: "/api/users",
			categories: "/api/categories",
			products: "/api/products",
		};

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
		this.app.use(this.paths.auth, require("../routes/auth.routes"));
		this.app.use(this.paths.users, require("../routes/user.routes"));
		this.app.use(this.paths.categories, require("../routes/categories.routes"));
		this.app.use(this.paths.products, require("../routes/products.routes"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening at http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
