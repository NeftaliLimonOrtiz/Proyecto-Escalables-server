const { Router } = require ('express');
const { getAllTenis, getTenisById, deleteTenisById, createTenis, updateTenis, getTenisDetail, addLike, getLikes } = require('../controllers/tenis');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/",  getAllTenis);
router.get("/:id?",[validateJWT, verifyAdminRole], getTenisById);
router.delete('/:id?',[validateJWT, verifyAdminRole], deleteTenisById);
router.post("/",[validateJWT, verifyAdminRole], createTenis);
router.put('/update/:id?',[validateJWT, verifyAdminRole],updateTenis);
router.get('/details/:id',[validateJWT, verifyAdminRole], getTenisDetail);
router.post('/like/:id?', addLike);
router.get('/likes/:userName?', getLikes)


module.exports = router;