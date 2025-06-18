const express = require('express')
const router = express.Router();
const issueController = require('../controllers/issue.controller')

router.post('/', issueController.create)
router.get('/', issueController.list);
router.put('/:id', issueController.update)
router.delete('/:id', issueController.remove)

module.exports = router;