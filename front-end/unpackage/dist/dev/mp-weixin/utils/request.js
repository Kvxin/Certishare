"use strict";
const common_vendor = require("../common/vendor.js");
require("../uni_modules/uview-plus/index.js");
common_vendor.axios.defaults.adapter = common_vendor.mpAdapter;
const service = common_vendor.axios.create({
  baseURL: "http://127.0.0.1:3011",
  // API 基础URL
  // baseURL: 'https://share.cs.kvxin.top/',
  timeout: 1e4
  // 请求超时时间
});
service.interceptors.request.use(
  (config) => {
    let token = common_vendor.index.getStorageSync("token");
    if (token)
      ;
    else {
      token = "";
    }
    config.headers["Authorization"] = token;
    return config;
  },
  (error2) => {
    return Promise.reject(error2);
  }
);
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    } else {
      console.log("错误了", response);
      return Promise.reject(error);
    }
  }
);
exports.service = service;
