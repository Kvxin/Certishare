"use strict";
const utils_request = require("../utils/request.js");
function getPostList() {
  return utils_request.service.get("/posts");
}
function getPostInfo(id) {
  return utils_request.service.post("/post-info", {
    id
  });
}
exports.getPostInfo = getPostInfo;
exports.getPostList = getPostList;
