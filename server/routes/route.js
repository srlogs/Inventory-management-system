const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user');




/**
 *  Create new user for registration field
 */
router.post('/newUser', user_controller.createUser);





module.exports = router;