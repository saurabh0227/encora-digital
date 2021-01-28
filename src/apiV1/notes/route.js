const express = require('express');
const router = express.Router();

const { verifyToken } = require('../auth/controller');
const {
  create,
  fetchAll,
  fetchByUser,
  update,
  remove,
} = require('./controller');

router.post('/create', verifyToken, create);

router.get('/fetchAll', verifyToken, fetchAll);

router.get('/fetchByUser', verifyToken, fetchByUser);

router.put('/update/:noteId', verifyToken, update);

router.delete('/remove/:noteId', verifyToken, remove);

module.exports = router;
