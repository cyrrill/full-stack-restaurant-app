const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: String,
    address: String,
    city: String,
    state: String,
    lines: [{ dish: {type: Schema.Types.ObjectId, ref:'Dish'}, quantity: Number, cost: Number }],
    total: Number,
    createdAt: Date,

});

module.exports = mongoose.model('Order', OrderSchema);