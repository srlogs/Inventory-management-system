const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user.controller.js');
const auth_controller = require('../controller/auth.controller');
const middleware = require('../middleware/index');




/**
 *  Create new user for registration module
 */
router.post('/newUser', middleware.verifySignUp.checkDuplicateEmail, user_controller.create);

/**
 *  Authenticate user for login module
 */
router.post('/authenticate', auth_controller.authenticate);

/**
 *  Get all registered user
 */
router.get('/getUsers', middleware.authJwt.validate, user_controller.getUsers);





module.exports = router;