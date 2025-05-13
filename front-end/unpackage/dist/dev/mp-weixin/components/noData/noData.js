"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "noData",
  data() {
    return {};
  }
};
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  _easycom_up_button2();
}
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_up_button();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.back),
    b: common_vendor.p({
      type: "primary",
      text: "返回上一页 "
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/noData/noData.vue"]]);
wx.createComponent(Component);
