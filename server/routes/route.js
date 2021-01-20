const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const customer_controller = require('../controllers/customer.controller');
const product_controller = require('../controllers/product.controller');
const middleware = require('../middleware/index');
const auth_controller = require('../controllers/auth.controller');
const order_controller = require('../controllers/order.controller');



/**
 *  Creating new user - (Delivery partner)
 */
router.post('/newUser', middleware.verifySignUp.checkDuplicateEmail, user_controller.create);

/**
 *  Authenticate user for login - (Delivery partner)
 */
router.post('/authenticate', auth_controller.authenticate);

/**
 *  Get all users - (Delivery partner)
 */
router.get('/getUsers', middleware.authJwt.validate, middleware.verifyRole.isAdmin, user_controller.getAll);

/**
 *  Remove user - (Delivery partner)
 */
router.delete('/user/:userId', middleware.authJwt.validate, middleware.verifyRole.isAdmin, user_controller.delete);

/**
 *  Adding customers - (Shops)
 */
router.post('/addCustomer', middleware.authJwt.validate, customer_controller.create);

/**
 *  Remove customer - (Shops)
 */
router.delete('/customer/:customerId', middleware.authJwt.validate, middleware.verifyRole.isAdmin, customer_controller.delete);

/**
 *  Get all customers - (Shops)
 */
router.get('/getCustomers', middleware.authJwt.validate, middleware.verifyRole.checkForDeliveryPartner, customer_controller.getAll);

/**
 *  Adding new products - (products)
 */
router.post('/addProduct', middleware.authJwt.validate, middleware.verifyRole.isAdmin, product_controller.create);

/**
 *  Remove products - (products)
 */
router.delete('/product/:productId', middleware.authJwt.validate, middleware.verifyRole.isAdmin, product_controller.delete);

/**
 *  Get products - (products)
 */
router.get('/getProducts', middleware.authJwt.validate, product_controller.findAll);

/**
 *  Get units - (units for products)
 */
router.get('/getUnits', middleware.authJwt.validate, product_controller.findUnits);

/**
 *  Make orders
 */
router.post('/addOrder', middleware.authJwt.validate, order_controller.create);

/**
 *  Cancel orders
 */
router.delete('/order/:orderId', middleware.authJwt.validate, order_controller.delete);


module.exports = router;