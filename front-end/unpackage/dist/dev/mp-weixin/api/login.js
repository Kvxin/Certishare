"use strict";
const utils_request = require("../utils/request.js");
function login(email, password) {
  return utils_request.service.post("/login", {
    email,
    password
  });
}
exports.login = login;
