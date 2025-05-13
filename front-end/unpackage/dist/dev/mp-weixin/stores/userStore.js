"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    userData: common_vendor.index.getStorageSync("userData") || null,
    token: common_vendor.index.getStorageSync("token") || null,
    isLogin: common_vendor.index.getStorageSync("isLogin") || null
  }),
  getters: {
    getUserData(state) {
      if (this.isLogin) {
        return state.userData;
      } else {
        return null;
      }
    }
  },
  actions: {
    setUser(data) {
      this.userData = data.userData;
      this.token = data.token;
      this.isLogin = true;
      common_vendor.index.setStorageSync("userData", data.userData);
      common_vendor.index.setStorageSync("token", data.token);
      common_vendor.index.setStorageSync("isLogin", this.isLogin);
    },
    updataUser(data) {
      this.userData = data.userData;
      common_vendor.index.setStorageSync("userData", data.userData);
    },
    logout() {
      this.userData = null;
      this.token = null;
      this.isLogin = false;
      common_vendor.index.removeStorageSync("userData");
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.setStorageSync("isLogin", this.isLogin);
    }
  }
});
exports.useUserStore = useUserStore;
