const mongoose = require('mongoose');

const signInSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    yearMonth: {
        type: String,
        required: true
    },
    dates: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

const SignIn = mongoose.model('SignIn', signInSchema);

module.exports = SignIn;