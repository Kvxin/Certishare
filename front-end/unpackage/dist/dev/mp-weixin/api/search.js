"use strict";
const utils_request = require("../utils/request.js");
function getSarch(searchText) {
  return utils_request.service.post("/search", {
    searchText
  });
}
function SarchPosts(searchText) {
  return utils_request.service.post("/searchPosts", {
    searchText
  });
}
function getSearchHot() {
  return utils_request.service.get("/getSearchHot");
}
exports.SarchPosts = SarchPosts;
exports.getSarch = getSarch;
exports.getSearchHot = getSearchHot;
