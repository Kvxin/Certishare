"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  _easycom_u_search2();
}
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
if (!Math) {
  _easycom_u_search();
}
const _sfc_main = {
  __name: "SearchWarp",
  setup(__props) {
    const actionStyle = common_vendor.ref({
      display: "none"
    });
    const jumpSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(jumpSearch),
        b: common_vendor.p({
          placeholder: "点击搜索",
          shape: "square",
          clearabled: true,
          disabled: true,
          actionText: "",
          actionStyle: actionStyle.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-82fb0745"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/SearchWarp/SearchWarp.vue"]]);
wx.createComponent(Component);
