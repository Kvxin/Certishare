"use strict";
const utils_request = require("../utils/request.js");
function getQuestion(data, userId) {
  return utils_request.service({
    url: "/getQuestion",
    method: "GET",
    params: {
      data,
      userId
    }
  });
}
function postAnswer(data) {
  return utils_request.service({
    url: "/post-answer",
    method: "POST",
    params: {
      data
    }
  });
}
exports.getQuestion = getQuestion;
exports.postAnswer = postAnswer;
