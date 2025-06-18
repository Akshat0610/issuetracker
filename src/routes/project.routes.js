const express = require('express')
const router = express.Router();
const projectController = require('../controllers/project.controller')

router.post('/', projectController.create)
router.get('/', projectController.list);
router.put('/:id', projectController.update)
router.delete('/:id', projectController.remove)

module.exports = router;