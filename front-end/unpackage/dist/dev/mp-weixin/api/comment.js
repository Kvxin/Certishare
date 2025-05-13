"use strict";
const utils_request = require("../utils/request.js");
function comSend(data) {
  return utils_request.service.post("/sendcomment", {
    data
  });
}
exports.comSend = comSend;
