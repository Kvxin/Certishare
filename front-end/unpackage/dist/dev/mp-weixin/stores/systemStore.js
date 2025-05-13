"use strict";
const common_vendor = require("../common/vendor.js");
const systemStore = common_vendor.defineStore("system", {
  state: () => ({
    navBar: common_vendor.index.getStorageSync("navBar") || {}
  }),
  getters: {
    getSystemNav(state) {
      return state.navBar;
    }
  },
  actions: {
    setNavBar(data) {
      common_vendor.index.setStorageSync("navBar", data);
      this.navBar = data;
    }
  }
});
exports.systemStore = systemStore;
