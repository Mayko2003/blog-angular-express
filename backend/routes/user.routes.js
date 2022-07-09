const express = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.get('/', authController.verifyToken, userController.getAllUsers);
router.get('/:id', authController.verifyToken, userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', authController.verifyToken, userController.updateUser);
router.delete('/:id', authController.verifyToken, userController.inactivateUser);
router.get('/user/:username', authController.verifyToken, userController.getUserByUsername);

// exports the router object
module.exports = router;