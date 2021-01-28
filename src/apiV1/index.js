const express = require('express');

const users = require('./users/route');
const notes = require('./notes/route');

const router = express.Router();

router.use('/users', users);
router.use('/notes', notes);

module.exports = router;
