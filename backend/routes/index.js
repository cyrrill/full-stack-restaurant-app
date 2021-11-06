const express = require('express');
const router = express.Router();
const cacheMiddleware = require('../middleware/cache-headers');

// Cache reponses for an hour in the client
router.use(cacheMiddleware);

router.get('/', function(req, res, next) {
  res.send({ status: '200 OK' });
});

module.exports = router;
