require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
