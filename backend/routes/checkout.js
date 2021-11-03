const express = require('express');
const firebaseAuth = require('../middleware/firebase-auth');
const router = express.Router();
// const Dish  = require('../models/dish')

function calculateOrderAmount(items) {
    let total = 0
    for (const item of items) {
        total += item.price * item.quantity
    }
    console.log('total: '+total)
    return total
}

router.post('/create-payment-intent', firebaseAuth, async function(req, res, next) {

    const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
    const { items } = req.body;

    console.log(items)

    // Create a PaymentIntent with the order amount and currency
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

module.exports = router;