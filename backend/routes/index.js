const express = require('express');
const firebaseAuth = require('../middleware/firebase-auth');
const router = express.Router();
const Dish  = require('../models/dish')

/* GET index. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.get('/secret', firebaseAuth, function(req, res, next) {
  res.json({ title: req.user.email })
});

router.get('/dish', async function(req, res, next) {
  res.json(await Dish.find({}));
});

module.exports = router;
