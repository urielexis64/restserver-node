const {Router} = require("express");
const {check} = require("express-validator");
const {loadFile} = require("../controllers/uploads.controller");

const {validateFields} = require("../middlewares/validate_fields");

const router = Router();

router.post("/", loadFile);

module.exports = router;
