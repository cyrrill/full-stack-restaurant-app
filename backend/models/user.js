const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: String,
    email: String,
    displayName: String,
    description: String,
    imageUrl: String,
});

module.exports = mongoose.model('User', UserSchema);