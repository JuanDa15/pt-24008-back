const { Router } = require("express");
const { login, register, renew } = require("../controllers/auth");
const { check } = require("express-validator");
const { checkBody } = require("../middlewares/check-body");
const { isValidUserType } = require("../validators/user-type-validation");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router()

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    checkBody
  ], 
  login
)

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('type', 'Type is required').not().isEmpty(),
    check('type').custom(isValidUserType).withMessage('Invalid user type'),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters, 1 mayus and 1 special character').matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:<>?~=\\[\]\\;',./-]).{6,}$/),
    checkBody
  ],
  register
)

router.post(
  '/renew', [validateJWT],renew
)

module.exports = router