"use strict";
const utils_request = require("../utils/request.js");
function singIn(data) {
  return utils_request.service.post("/signin", {
    data
  });
}
function getUserSignData(userId) {
  return utils_request.service.post("/getUserSignInData", {
    userId
  });
}
function getUserData(id) {
  return utils_request.service.post("/getUser", {
    id
  });
}
function getUserCardData(id) {
  return utils_request.service.post("/getUserCardList", {
    id
  });
}
function updateUserInformation(uid, updateInfo) {
  const dataToUpdate = {
    uid,
    updateInfo
  };
  return utils_request.service.patch("/updateUser", dataToUpdate);
}
exports.getUserCardData = getUserCardData;
exports.getUserData = getUserData;
exports.getUserSignData = getUserSignData;
exports.singIn = singIn;
exports.updateUserInformation = updateUserInformation;
