const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

main().catch(err => console.log(err));

