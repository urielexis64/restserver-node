const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {dbConnection} = require("../db/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			auth: "/api/auth",
			categories: "/api/categories",
			products: "/api/products",
			search: "/api/search",
			uploads: "/api/uploads",
			users: "/api/users",
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

		// Fileupload
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: "/tmp/",
				createParentPath: true,
			})
		);
	}

	routes() {
		this.app.use(this.paths.auth, require("../routes/auth.routes"));
		this.app.use(this.paths.categories, require("../routes/categories.routes"));
		this.app.use(this.paths.products, require("../routes/products.routes"));
		this.app.use(this.paths.search, require("../routes/search.routes"));
		this.app.use(this.paths.uploads, require("../routes/uploads.routes"));
		this.app.use(this.paths.users, require("../routes/user.routes"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening at http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
