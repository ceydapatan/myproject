const express = require('express');
const router = express.Router();
const user = require('../model/user');
router.use('/user', user);
module.exports = router;
