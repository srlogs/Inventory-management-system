const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const customer_controller = require('../controllers/customer.controller');
const product_controller = require('../controllers/product.controller');
const middleware = require('../middleware/index');
const auth_controller = require('../controllers/auth.controller');
const order_controller = require('../controllers/order.controller');

/**
 *  Creating new user
 */
router.post('/newUser', middleware.verifySignUp.checkDuplicateEmail, user_controller.create);

/**
 *  Authenticate user for login
 */
router.post('/authenticate', auth_controller.authenticate);

/**
 *  Get all users
 */
router.get('/getUsers', middleware.authJwt.validate, user_controller.getAll);

/**
 *  Remove user
 */
router.delete('/user/:userId', middleware.authJwt.validate, user_controller.delete);

/**
 *  Adding customers
 */
router.post('/addCustomer', middleware.authJwt.validate, customer_controller.create);

/**
 *  Remove customer
 */
router.delete('/customer/:customerId', middleware.authJwt.validate, customer_controller.delete);

/**
 *  Get all customers
 */
router.get('/getCustomers', middleware.authJwt.validate, customer_controller.getAll);

/**
 *  Adding new products
 */
router.post('/addProduct', middleware.authJwt.validate, product_controller.create);

/**
 *  Make orders
 */
router.post('/addOrder', middleware.authJwt.validate, order_controller.create);

/**
 *  Cancel orders
 */
router.delete('/order/:orderId', middleware.authJwt.validate, order_controller.delete);


module.exports = router;