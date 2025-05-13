"use strict";const t=require("../utils/request.js");exports.getPostInfo=function(s){return t.service.post("/post-info",{id:s})},exports.getPostList=function(){return t.service.get("/posts")};
