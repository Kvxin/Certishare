const express = require('express');
const router = express.Router();
const Carousel = require('../models/Carousel');
const User = require("../models/User")

router.get('/getAllCarousels', (req, res) => {
    try {
        Carousel.find()
            .then(carousels => {
                res.json({ success: true, data: carousels });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            });
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;