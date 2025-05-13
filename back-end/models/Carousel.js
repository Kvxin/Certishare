const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    images: [
        {
            imageUrl: {
                type: String,
                required: true,
            },
        },
    ],
    cardId: {
        type: String,
    }
});
const Carousel = mongoose.model('Carousel', carouselSchema);
module.exports = Carousel;