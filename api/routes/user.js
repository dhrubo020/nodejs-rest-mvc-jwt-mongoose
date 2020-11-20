const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const userController = require('../controllers/userController')


router.post('/login' , userController.loginController)
router.post('/register' , userController.registerController)

router.get('/', authenticate, userController.getAllUser)

module.exports = router