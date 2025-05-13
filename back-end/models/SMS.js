const mongoose = require('mongoose');
const SMSSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    code: Number,
    timestamp: String,
    expireAt: {
        type: String,
        index: {
            expires: '10m',
        }
    }
});


const SMS = mongoose.model('SMS', SMSSchema);

module.exports = SMS;