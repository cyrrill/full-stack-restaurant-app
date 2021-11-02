const express = require('express');
const router = express.Router();
const Dish  = require('../models/dish');
const Restaurant = require('../models/restaurant')

router.get('/', async function(req, res, next) {
  res.json(await Restaurant.find());
});

router.get('/:restaurantId', async function(req, res, next) {
  res.json(await Restaurant.findById(req.params.restaurantId));
});


module.exports = router;
