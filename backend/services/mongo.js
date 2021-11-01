const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect('mongodb://localhost:27017/restaurant');
}

main().catch(err => console.log(err));

