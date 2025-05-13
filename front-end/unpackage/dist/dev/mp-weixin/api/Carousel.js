"use strict";
const utils_request = require("../utils/request.js");
function getCarousel() {
  return utils_request.service.get("/getAllCarousels");
}
exports.getCarousel = getCarousel;
