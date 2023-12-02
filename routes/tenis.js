const { Router } = require('express');
const { getAllTenis } = require('../controllers/tenis');
const router = Router();

router.get("/", getAllTenis);

module.exports = router;