const express = require('express');
const config = require('../config/config.js');
const router = express.Router();
const user_controller = require('../controller/user');




/**
 *  Create new user
 */

router.post('/newUser', user_controller.createUser);



module.exports = router;