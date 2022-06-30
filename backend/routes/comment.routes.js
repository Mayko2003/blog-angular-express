const express = require('express');
const commentController = require('../controllers/comment.controller');

const router = express.Router();

router.get('/', commentController.getAllCommentsByPost);
router.post('/', commentController.createComment);

// export the router
module.exports = router;