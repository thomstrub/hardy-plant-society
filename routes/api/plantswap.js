const express = require('express');
const router = express.Router();
const plantSwapCtrl = require('../../controllers/plantswap');
const multer = require('multer');
const upload = multer();
// /*---------- Public Routes ----------*/

router.post('/',upload.single('photo'), plantSwapCtrl.create);
router.get('/', plantSwapCtrl.index);
router.get('/api/:searchTag', plantSwapCtrl.searchTrefle);
router.get('/:id', plantSwapCtrl.show);
router.delete('/:id', plantSwapCtrl.delete);


/*---------- Protected Routes ----------*/




module.exports = router;