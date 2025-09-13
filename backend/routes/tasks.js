const express = require('express');
const router = express.Router();

router.get('/', require('./getTasks'));
router.post('/', require('./postTask'));
router.put('/:id', require('./updateTask'));
router.delete('/:id', require('./deleteTask'));
router.patch('/:id/toggle', require('./toggleTask'));

module.exports = router;
