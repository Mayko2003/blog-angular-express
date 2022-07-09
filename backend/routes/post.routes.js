const express = require('express');
const postController = require('../controllers/post.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.get('/', authController.verifyToken, postController.getAllPosts);
router.get('/:id', authController.verifyToken,postController.getPost);
router.get('/slug/:slug', authController.verifyToken, postController.getPostBySlug);
router.post('/', authController.verifyToken, postController.createPost);
router.put('/:id', authController.verifyToken, postController.updatePost);
router.delete('/:id', authController.verifyToken, postController.inactivatePost);
router.get('/status/published', authController.verifyToken, postController.getPublishedPosts);
router.get('/time/recent', authController.verifyToken, postController.getRecentPosts);

// export the router
module.exports = router;