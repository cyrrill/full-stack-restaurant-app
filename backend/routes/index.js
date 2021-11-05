const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ status: '200 OK' });
});

module.exports = router;
