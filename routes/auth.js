const { Router } = require('express');
const {getLogin} = require("../controllers/auth");
const router = Router();

router.post("/login", getLogin);


module.exports = router;