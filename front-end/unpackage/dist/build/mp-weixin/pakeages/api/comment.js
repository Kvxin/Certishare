"use strict";const e=require("../utils/request.js");exports.comSend=function(t){return e.service.post("/sendcomment",{data:t})};
