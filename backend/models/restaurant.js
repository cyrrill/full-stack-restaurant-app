const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    dishes: [{type: Schema.Types.ObjectId, ref:'Dish'}],
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);