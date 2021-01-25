const express = require('express');
const router = express.Router();
const adminCtrl = require('../../controllers/admin');
const multer = require('multer');
const upload = multer();
// /*---------- Public Routes ----------*/

router.post('/',upload.single('photo'), adminCtrl.create);
router.get('/', adminCtrl.index);



/*---------- Protected Routes ----------*/




module.exports = router;