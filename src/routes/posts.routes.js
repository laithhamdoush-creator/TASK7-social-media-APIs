const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.patch('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);
router.post('/:id/like', postsController.likePost);
router.get('/:id/comments', postsController.getPostComments);

module.exports = router;