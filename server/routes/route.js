const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user.controller');
const auth_controller = require('../controller/auth.controller');
const address_controller = require('../controller/address.controller');
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

/**
 *  Adding addresses for user
 */
router.post('/addAddress', middleware.authJwt.validate, address_controller.create);


module.exports = router;