const express = require('express');
const router = express.Router();
const Dish  = require('../models/dish');
const Restaurant = require('../models/restaurant');

router.get('/', async function(req, res, next) {

  // #swagger.tags = ['Restaurants']
  // #swagger.description = 'Listing of all restaurants'

  res.json(await Restaurant.find());
});

router.get('/dishes', async function(req, res, next) {

  // #swagger.tags = ['Restaurants']
  // #swagger.description = 'Listing of all dishes'

  res.json(await Dish.find());
});

router.get('/:restaurantId', async function(req, res, next) {

  // #swagger.tags = ['Restaurants']
  // #swagger.description = 'Get details for one restaurant by ID'
  // #swagger.parameters['restaurantId'] = { description: 'Restaurant ID to lookup', type: 'string' }

  res.json(await Restaurant.findById(req.params.restaurantId));
});

module.exports = router;
