"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/userStore.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + common_vendor.unref(CardAndPostVue))();
}
const CardAndPostVue = () => "../../components/CardAndPost/CardAndPost.js";
const _sfc_main = {
  __name: "my-post",
  setup(__props) {
    function back() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(back),
        b: common_vendor.p({
          fixed: true,
          shadow: true,
          ["status-bar"]: true,
          ["left-icon"]: "left",
          ["right-width"]: "30px",
          height: "65px",
          border: false,
          title: "我的发布"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd396228"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/my-post/my-post.vue"]]);
wx.createPage(MiniProgramPage);
