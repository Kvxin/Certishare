"use strict";
const utils_request = require("../utils/request.js");
function register(userData) {
  return utils_request.service.post("/register", {
    userData
  });
}
function sendCode(email) {
  return utils_request.service.post("/sendVerification", {
    email
  });
}
exports.register = register;
exports.sendCode = sendCode;
