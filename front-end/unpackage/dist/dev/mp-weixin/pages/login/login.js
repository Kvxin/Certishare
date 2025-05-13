"use strict";
const common_vendor = require("../../common/vendor.js");
const login = {
  loginPage: {
    text: {
      title: "欢迎回来！",
      prompt: "输入账号密码以登录或者注册一个账户"
    },
    field: {
      username: "输入邮箱或者用户名",
      password: "输入密码",
      placeholder: {
        username: "请输入邮箱",
        password: "请输入密码"
      },
      tips: {
        p: "没有账号?",
        span: "立即注册!"
      },
      model: "提示",
      button: "登录"
    }
  }
};
const zh_Hans = {
  login
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_nav_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_icons + LoginWarp + RegisterWarp)();
}
const LoginWarp = () => "../../components/LoginWarp/LoginWarp.js";
const RegisterWarp = () => "../../components/RigisterWarp/RegisterWarp.js";
const _sfc_main = {
  __name: "login",
  setup(__props) {
    zh_Hans.login.loginPage.field;
    common_vendor.ref(true);
    const isFlipped = common_vendor.ref(false);
    const hideBackWarp = common_vendor.ref(false);
    const toggleFlip = () => {
      isFlipped.value = !isFlipped.value;
      setTimeout(() => {
        hideBackWarp.value = isFlipped.value;
      }, 300);
    };
    const backIndex = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onMounted(() => {
      common_vendor.index.$on("changeFlipped", () => {
        toggleFlip();
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          border: false,
          ["background-color"]: "#fafafa"
        }),
        b: common_vendor.o(backIndex),
        c: common_vendor.p({
          type: "arrow-left",
          size: "32"
        }),
        d: common_vendor.t(common_vendor.unref(zh_Hans).login.loginPage.text.title),
        e: common_vendor.t(common_vendor.unref(zh_Hans).login.loginPage.text.prompt),
        f: hideBackWarp.value ? 1 : "",
        g: !hideBackWarp.value ? 1 : "",
        h: isFlipped.value ? 1 : ""
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
