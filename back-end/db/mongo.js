require("dotenv").config();
const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database.
 *
 * @return {Promise} A Promise that resolves when the connection is successful, and rejects with an error if the connection fails.
 */
const connectDB = async () => {
    await mongoose.connect(`${process.env.DATABASE_URL}`)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}


module.exports = connectDB;