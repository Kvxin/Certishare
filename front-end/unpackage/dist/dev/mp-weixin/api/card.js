"use strict";
const utils_request = require("../utils/request.js");
function getCardList() {
  return utils_request.service.get("/api/getCardList");
}
function getCardInfo(id) {
  return utils_request.service.get(`/api/getCardInfo?id=${id}`);
}
function setLikeCard(cardId, userId) {
  return utils_request.service.post("/api/setLikeCard", {
    cardId,
    userId
  });
}
function createCard(data) {
  return utils_request.service.post("/api/createCard", {
    data
  });
}
function getTypeList(key) {
  return utils_request.service.post("/api/getTypeList", {
    key
  });
}
function addToWatchedHistory(userId, cardId) {
  return utils_request.service.post("/api/addToWatchedHistory", {
    userId,
    cardId
  });
}
exports.addToWatchedHistory = addToWatchedHistory;
exports.createCard = createCard;
exports.getCardInfo = getCardInfo;
exports.getCardList = getCardList;
exports.getTypeList = getTypeList;
exports.setLikeCard = setLikeCard;
