const express = require('express');
const router = express.Router();
const emailCtrl = require('../../controllers/email');
const multer = require('multer');
const upload = multer();
// /*---------- Public Routes ----------*/


router.get('/', emailCtrl.getKeys);



/*---------- Protected Routes ----------*/




module.exports = router;