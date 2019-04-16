const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');

router.post('/register', 
  [
    body('password')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Please enter a valid password.'),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid  username.')
  ]
, authController.signUp);
router.post('/login', authController.signIn);

module.exports = router;
