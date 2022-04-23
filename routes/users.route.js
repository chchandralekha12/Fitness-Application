const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/change-password', auth, userController.changePassword);
router.get('/get-subscription', auth, userController.getSubscription);
router.put('/add-subscription', auth, userController.addSubscription);
router.put('/cancel-subscription', auth, userController.cancelSubscription);

module.exports = router;