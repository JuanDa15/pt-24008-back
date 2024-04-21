const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createOrder, getOrders, getOrder } = require('../controllers/cart');
const { check } = require('express-validator');
const { checkBody } = require('../middlewares/check-body');
const {
  productsLengthValidation,
} = require('../validators/products-length-validation');

const router = Router();

router.use([validateJWT]);

router.get('/', getOrders);

router.post(
  '/',
  [
    check('products', 'Products is required').not().isEmpty(),
    check('products')
      .custom(productsLengthValidation)
      .withMessage('Products should have at least 1 product'),
    checkBody,
  ],
  createOrder
);

router.get('/:id', getOrder);

module.exports = router;
