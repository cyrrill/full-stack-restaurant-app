const express = require('express');
const firebaseAuth = require('../middleware/firebase-auth');
const router = express.Router();
const Order  = require('../models/order');

router.post('/create-payment-intent', firebaseAuth, async function(req, res, next) {

  // #swagger.tags = ['Checkout']
  // #swagger.description = 'Creates a Stripe payment intent which will be used for payment processing'
  // #swagger.parameters['items'] = { description: 'Array of Dish items', type: 'array', in: 'body' }
  // #swagger.security = [{ "jwt": [] }]

  const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: router.calculateOrderAmount(items),
    currency: "usd",
    payment_method_types: [
      "card",
    ],
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post('/order', firebaseAuth, async function(req, res, next) {

  // #swagger.tags = ['Checkout']
  // #swagger.description = 'Create an order based on a list of items and a payment intent'
  // #swagger.parameters['paymentIntent'] = { description: 'Stripe API response object', type: 'object', in: 'body' }
  // #swagger.parameters['items'] = { description: 'Array of Dish items', type: 'array', in: 'body' }
  // #swagger.security = [{ "jwt": [] }]

  const { paymentIntent, items } = req.body;
  const order = new Order({
    user: req.user.email,
    address: paymentIntent.shipping.address['address-line1'],
    city: paymentIntent.shipping.address['address-city'],
    state: paymentIntent.shipping.address['address-state'],
    zip: paymentIntent.shipping.address['address-zip'],
    items,
    payment: paymentIntent.id,
    total: paymentIntent.amount,
    createdAt: new Date()
  });
  await order.save()
  res.json(order)
});

router.get('/history', firebaseAuth, async function(req, res, next) {

  // #swagger.tags = ['Checkout']
  // #swagger.description = 'Get user order history'
  // #swagger.security = [{ "jwt": [] }]

  res.json(await Order.find({user: req.user.email}))
});

// Calculate order total server-side to avoid manual alter client-side
router.calculateOrderAmount = (items) => {
  let total = 0
  for (const item of items) {
      total += item.price * item.quantity
  }
  return total
}

module.exports = router;