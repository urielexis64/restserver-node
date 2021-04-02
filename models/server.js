const express = require("express");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Middlewares
		this.middlewares();

		//Application routes
		this.routes();
	}

	middlewares() {
		// Public directory
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.get("/api", (req, res) => {
			res.json("get API");
		});
		this.app.put("/api", (req, res) => {
			res.json("put API");
		});
		this.app.post("/api", (req, res) => {
			res.json("post API");
		});
		this.app.delete("/api", (req, res) => {
			res.json("delete API");
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening at http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
