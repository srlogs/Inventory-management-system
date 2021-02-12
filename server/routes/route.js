const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const customer_controller = require('../controllers/customer.controller');
const product_controller = require('../controllers/product.controller');
const middleware = require('../middleware/index');
const auth_controller = require('../controllers/auth.controller');
const order_controller = require('../controllers/order.controller');
const stock_controller = require('../controllers/stock.controller');



/**
 *  1. Creating new user - (Delivery partner)
 */
router.post('/newUser', middleware.verifySignUp.checkDuplicateEmail, user_controller.create);

/**
 *  2. Authenticate user for login - (Delivery partner)
 */
router.post('/authenticate', auth_controller.authenticate);

/**
 *  3. Get all users - (Delivery partner)
 */
router.get('/getUsers', middleware.authJwt.validate, middleware.verifyRole.isAdmin, user_controller.getAll);

/**
 *  4. Remove user - (Delivery partner)
 */
router.delete('/user/:userId', middleware.authJwt.validate, middleware.verifyRole.isAdmin, user_controller.delete);

/**
 *  5. Adding customers - (Shops)
 */
router.post('/addCustomer', middleware.authJwt.validate, customer_controller.create);

/**
 *  6. Remove customer - (Shops)
 */
router.delete('/customer/:customerId', middleware.authJwt.validate, middleware.verifyRole.isAdmin, customer_controller.delete);

/**
 *  7. Get all customers - (Shops)
 */
router.get('/getCustomers', middleware.authJwt.validate, middleware.verifyRole.checkForDeliveryPartner, customer_controller.getAll);

/**
 *  8. Adding new products - (products)
 */
router.post('/addProduct', middleware.authJwt.validate, middleware.verifyRole.isAdmin, product_controller.create);

/**
 *  9. Remove products - (products)
 */
router.delete('/product/:productId', middleware.authJwt.validate, middleware.verifyRole.isAdmin, product_controller.delete);

/**
 *  10. Get products - (products)
 */
router.get('/getProducts', middleware.authJwt.validate, product_controller.findAll);

/**
 *  11. Get single product data - (products)
 */
router.get('/getProduct/:productId', middleware.authJwt.validate, product_controller.findOne);

/**
 *  12. Update products - (products)
 */
router.post('/updateProduct', middleware.authJwt.validate, middleware.verifyRole.isAdmin, product_controller.update);

/**
 *  13. Get units - (units for products)
 */
router.get('/getUnits', middleware.authJwt.validate, product_controller.findUnits);

/**
 *  14. Make orders
 */
router.post('/addOrder', middleware.authJwt.validate, order_controller.create);

/**
 *  15. Cancel orders
 */
router.delete('/order/:orderId', middleware.authJwt.validate, order_controller.delete);

/**
 *  16. Add stocks
 */
router.post('/addStock', middleware.authJwt.validate, middleware.verifyRole.isAdmin, stock_controller.create);

/**
 *  17. get product stock data
 */
router.post('/getStock', middleware.authJwt.validate, middleware.verifyRole.isAdmin, stock_controller.getOneStock);

/**
 *  18. update product stock data
 */
router.post('/updateStock', middleware.authJwt.validate, middleware.verifyRole.isAdmin, stock_controller.updateStock);


module.exports = router;