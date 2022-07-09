const express = require('express');
const commentController = require('../controllers/comment.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.get('/', authController.verifyToken, commentController.getAllCommentsByPost);
router.post('/', authController.verifyToken, commentController.createComment);

// export the router
module.exports = router;