"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniStatusBar",
  data() {
    return {
      statusBarHeight: common_vendor.index.getSystemInfoSync().statusBarHeight + "px"
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue"]]);
wx.createComponent(Component);
