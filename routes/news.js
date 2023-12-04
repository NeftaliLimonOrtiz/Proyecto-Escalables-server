const { Router } = require ('express');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');
const { getAllnews, getNewsById, deleteNewsById, createNews, updateNews, getNewsDetail, markNewsAsRead, addRead, getReads } = require('../controllers/news');
const router = Router();

router.get("/",  getAllnews);
router.get("/:id?", [validateJWT, verifyAdminRole], getNewsById);
router.delete("/:id?",[validateJWT, verifyAdminRole], deleteNewsById);
router.put('/mark-as-read/:id', markNewsAsRead);
router.post("/",[validateJWT, verifyAdminRole], createNews);
router.put("/update/:id?",[validateJWT, verifyAdminRole], updateNews);
router.get('/details/:id',[validateJWT, verifyAdminRole], getNewsDetail);
router.post('/like/:id?', addRead);
router.get('/likes/:userName?', getReads)




module.exports = router;
