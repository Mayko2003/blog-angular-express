const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);
router.get('/slug/:slug', postController.getPostBySlug);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.inactivatePost);
router.get('/status/published', postController.getPublishedPosts);
router.get('/time/recent', postController.getRecentPosts);

// export the router
module.exports = router;