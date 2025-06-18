const express = require('express')
const router = express.Router();
const commentController = require('../controllers/comment.controller')

router.post('/:id/comments', commentController.create)
router.get('/:id/comments', commentController.list);

module.exports = router;