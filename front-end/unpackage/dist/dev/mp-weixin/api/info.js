"use strict";
const utils_request = require("../utils/request.js");
function getNavData() {
  return utils_request.service.get("/getNav");
}
exports.getNavData = getNavData;
