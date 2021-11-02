const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    dishes: [{ type: Schema.Types.ObjectId, ref:'Dish', autopopulate: true }],
});

RestaurantSchema.plugin(autopopulate);

module.exports = mongoose.model('Restaurant', RestaurantSchema);