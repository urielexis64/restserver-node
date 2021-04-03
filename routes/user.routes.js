const {Router} = require("express");
const {getUsers, putUsers, postUsers, deleteUsers} = require("../controllers/users.controller");

const router = Router();

router.get("/", getUsers);
router.put("/", putUsers);
router.post("/", postUsers);
router.delete("/", deleteUsers);

module.exports = router;
