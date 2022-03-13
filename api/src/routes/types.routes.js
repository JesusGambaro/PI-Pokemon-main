const {Router} = require("express");
const {getAllTypes} = require("../controllers/types.controller");

const router = Router();

router.get("/", getAllTypes);

module.exports = router;
