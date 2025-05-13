"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userStore = require("../../stores/userStore.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "drag",
  setup(__props) {
    const bottom = common_vendor.ref(100);
    const right = common_vendor.ref(15);
    const pageX = common_vendor.ref(0);
    const pageY = common_vendor.ref(0);
    const userStores = stores_userStore.useUserStore();
    const isDrags = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      const xy = common_vendor.index.getStorageSync("xy");
      if (xy) {
        bottom.value = xy.bottom;
        right.value = xy.right;
      }
    });
    function start(e) {
      isDrags.value = true;
      const page = e.changedTouches[0];
      pageX.value = page.pageX;
      pageY.value = page.pageY;
    }
    function move(e) {
      isDrags.value = true;
      const page = e.changedTouches[0];
      const x = page.pageX - pageX.value;
      const y = page.pageY - pageY.value;
      pageX.value = page.pageX;
      pageY.value = page.pageY;
      right.value -= x;
      bottom.value -= y;
      common_vendor.index.setStorageSync("xy", {
        right: right.value,
        bottom: bottom.value
      });
    }
    function end(e) {
      e.changedTouches[0];
      isDrags.value = false;
    }
    function checkLogin() {
      const isLogin = userStores.getUserData;
      if (!isLogin) {
        common_vendor.index.showToast({
          title: "未登录，请先登录 ",
          icon: "error"
        });
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/post-page/post-page"
        });
      }
    }
    function jumpSendCard() {
      checkLogin();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isDrags.value
      }, isDrags.value ? {} : {}, {
        b: common_vendor.p({
          type: "plusempty",
          size: "30"
        }),
        c: bottom.value + "px",
        d: right.value + "px",
        e: common_vendor.o(start),
        f: common_vendor.o(move),
        g: common_vendor.o(end),
        h: common_vendor.o(jumpSendCard)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c86c74e3"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/drag/drag.vue"]]);
wx.createComponent(Component);
