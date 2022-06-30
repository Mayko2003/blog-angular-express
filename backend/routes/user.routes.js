const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.inactivateUser);
router.get('/user/:username', userController.getUserByUsername);

// exports the router object
module.exports = router;