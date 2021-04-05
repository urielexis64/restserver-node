require("dotenv").config();
console.log("Database_URL", process.env.MONGODB_ATLAS);
const Server = require("./models/server");

const server = new Server();

server.listen();
