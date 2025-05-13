"use strict";const s=require("../utils/request.js");exports.login=function(e,r){return s.service.post("/login",{email:e,password:r})};
