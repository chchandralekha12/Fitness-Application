const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/change-password');
router.put('/add-subscription');
router.put('/cancel-subscription');

module.exports = router;