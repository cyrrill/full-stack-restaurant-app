const express = require('express');
const firebaseAuth = require('../middleware/firebase-auth');
const router = express.Router();
const Order  = require('../models/order');

function calculateOrderAmount(items) {
    let total = 0
    for (const item of items) {
        total += item.price * item.quantity
    }
    return total
}

router.post('/create-payment-intent', firebaseAuth, async function(req, res, next) {

    const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      payment_method_types: [
        "card",
      ],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
});

router.post('/order', firebaseAuth, async function(req, res, next) {
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

module.exports = router;