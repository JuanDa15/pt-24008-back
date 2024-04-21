const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { listProducts, createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/product");
const { check } = require("express-validator");
const { checkBody } = require("../middlewares/check-body");
const router = Router()

router.use([validateJWT])


router.get('/',listProducts)

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('price', 'Price must be a number').isNumeric(),
  check('price', 'Price must be greater than 0').isFloat({ min: 0 }),
  check('description', 'Description is required').not().isEmpty(),
  check('stock', 'Stock is required').not().isEmpty(),
  check('stock', 'Stock must be a number').isNumeric(),
  checkBody
],createProduct)

router.get('/:id', getProduct)
router.put('/:id', [
  check('name', 'Name is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('price', 'Price must be a number').isNumeric(),
  check('price', 'Price must be greater than 0').isFloat({ min: 0 }),
  check('description', 'Description is required').not().isEmpty(),
  check('stock', 'Stock is required').not().isEmpty(),
  check('stock', 'Stock must be a number').isNumeric(),
  checkBody
] , updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router;