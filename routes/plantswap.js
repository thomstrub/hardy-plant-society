const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer = require('multer');
const upload = multer();
// /*---------- Public Routes ----------*/
router.post('/',upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)


/*---------- Protected Routes ----------*/




module.exports = router;