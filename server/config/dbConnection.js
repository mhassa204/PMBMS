const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect;