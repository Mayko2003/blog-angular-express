const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', authController.login);
router.get('/user', authController.verifyToken ,authController.getUser);

// exports the router object
module.exports = router;