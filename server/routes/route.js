const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user');
const auth_controller = require('../controller/auth');




/**
 *  Create new user for registration module
 */
router.post('/newUser', user_controller.createUser);

/**
 *  Authenticate user for login module
 */
router.post('/authenticate', auth_controller.authenticate);

/**
 *  Get all registered user
 */
router.get('/getUsers', user_controller.getUsers);



module.exports = router;