"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.defineStore("counter", {
  state: () => {
    return {
      count: 0
    };
  },
  getters: {},
  actions: {
    increment() {
      this.count++;
    }
  }
});
