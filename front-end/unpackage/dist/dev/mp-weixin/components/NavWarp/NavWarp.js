"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  _easycom_u_navbar2();
}
const _easycom_u_navbar = () => "../../uni_modules/uview-plus/components/u-navbar/u-navbar.js";
if (!Math) {
  _easycom_u_navbar();
}
const _sfc_main = {
  __name: "NavWarp",
  setup(__props) {
    const topNav = common_vendor.ref([{ text: "首页" }, { text: "社区 " }]);
    let activeIndex = common_vendor.ref(0);
    let barHeight = common_vendor.ref(0);
    const changePage = (index) => {
      activeIndex.value = index;
      common_vendor.index.$emit("change-page", index === 0);
    };
    common_vendor.onMounted(() => {
      common_vendor.wx$1.getSystemInfo({
        success: (res) => {
          barHeight.value = res.statusBarHeight;
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(topNav.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: common_vendor.o(($event) => changePage(index)),
            c: index == common_vendor.unref(activeIndex) ? 1 : ""
          };
        }),
        b: common_vendor.unref(barHeight) + "rpx"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d7c09b36"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/NavWarp/NavWarp.vue"]]);
wx.createComponent(Component);
