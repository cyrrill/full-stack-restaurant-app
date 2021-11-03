const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    items: [{ dish: {type: Schema.Types.ObjectId, ref:'Dish'}, quantity: Number, cost: Number }],
    total: Number,
    payment: String,
    createdAt: Date,
});

module.exports = mongoose.model('Order', OrderSchema);