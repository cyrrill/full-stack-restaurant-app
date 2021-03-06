const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    price: Number
});

module.exports = mongoose.model('Dish', DishSchema);