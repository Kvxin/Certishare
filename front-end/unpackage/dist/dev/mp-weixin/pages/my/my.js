"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const stores_userStore = require("../../stores/userStore.js");
require("../../utils/request.js");
require("../../uni_modules/uview-plus/index.js");
require("../../uni_modules/uview-plus/libs/mixin/mixin.js");
require("../../uni_modules/uview-plus/libs/mixin/mpMixin.js");
require("../../uni_modules/uview-plus/libs/luch-request/core/Request.js");
require("../../uni_modules/uview-plus/libs/luch-request/core/dispatchRequest.js");
require("../../uni_modules/uview-plus/libs/luch-request/adapters/index.js");
require("../../uni_modules/uview-plus/libs/luch-request/helpers/buildURL.js");
require("../../uni_modules/uview-plus/libs/luch-request/utils.js");
require("../../uni_modules/uview-plus/libs/luch-request/core/buildFullPath.js");
require("../../uni_modules/uview-plus/libs/luch-request/helpers/isAbsoluteURL.js");
require("../../uni_modules/uview-plus/libs/luch-request/helpers/combineURLs.js");
require("../../uni_modules/uview-plus/libs/luch-request/core/settle.js");
require("../../uni_modules/uview-plus/libs/luch-request/core/InterceptorManager.js");
require("../../uni_modules/uview-plus/libs/luch-request/core/mergeConfig.js");
require("../../uni_modules/uview-plus/libs/luch-request/core/defaults.js");
require("../../uni_modules/uview-plus/libs/luch-request/utils/clone.js");
require("../../uni_modules/uview-plus/libs/util/route.js");
require("../../uni_modules/uview-plus/libs/function/colorGradient.js");
require("../../uni_modules/uview-plus/libs/function/test.js");
require("../../uni_modules/uview-plus/libs/function/debounce.js");
require("../../uni_modules/uview-plus/libs/function/throttle.js");
require("../../uni_modules/uview-plus/libs/function/index.js");
require("../../uni_modules/uview-plus/libs/function/digit.js");
require("../../uni_modules/uview-plus/libs/config/config.js");
require("../../uni_modules/uview-plus/libs/config/props.js");
require("../../uni_modules/uview-plus/libs/config/props/actionSheet.js");
require("../../uni_modules/uview-plus/libs/config/props/album.js");
require("../../uni_modules/uview-plus/libs/config/props/alert.js");
require("../../uni_modules/uview-plus/libs/config/props/avatar.js");
require("../../uni_modules/uview-plus/libs/config/props/avatarGroup.js");
require("../../uni_modules/uview-plus/libs/config/props/backtop.js");
require("../../uni_modules/uview-plus/libs/config/props/badge.js");
require("../../uni_modules/uview-plus/libs/config/props/button.js");
require("../../uni_modules/uview-plus/libs/config/props/calendar.js");
require("../../uni_modules/uview-plus/libs/config/props/carKeyboard.js");
require("../../uni_modules/uview-plus/libs/config/props/cell.js");
require("../../uni_modules/uview-plus/libs/config/props/cellGroup.js");
require("../../uni_modules/uview-plus/libs/config/props/checkbox.js");
require("../../uni_modules/uview-plus/libs/config/props/checkboxGroup.js");
require("../../uni_modules/uview-plus/libs/config/props/circleProgress.js");
require("../../uni_modules/uview-plus/libs/config/props/code.js");
require("../../uni_modules/uview-plus/libs/config/props/codeInput.js");
require("../../uni_modules/uview-plus/libs/config/props/col.js");
require("../../uni_modules/uview-plus/libs/config/props/collapse.js");
require("../../uni_modules/uview-plus/libs/config/props/collapseItem.js");
require("../../uni_modules/uview-plus/libs/config/props/columnNotice.js");
require("../../uni_modules/uview-plus/libs/config/props/countDown.js");
require("../../uni_modules/uview-plus/libs/config/props/countTo.js");
require("../../uni_modules/uview-plus/libs/config/props/datetimePicker.js");
require("../../uni_modules/uview-plus/libs/config/props/divider.js");
require("../../uni_modules/uview-plus/libs/config/props/empty.js");
require("../../uni_modules/uview-plus/libs/config/props/form.js");
require("../../uni_modules/uview-plus/libs/config/props/formItem.js");
require("../../uni_modules/uview-plus/libs/config/props/gap.js");
require("../../uni_modules/uview-plus/libs/config/props/grid.js");
require("../../uni_modules/uview-plus/libs/config/props/gridItem.js");
require("../../uni_modules/uview-plus/libs/config/props/icon.js");
require("../../uni_modules/uview-plus/libs/config/props/image.js");
require("../../uni_modules/uview-plus/libs/config/props/indexAnchor.js");
require("../../uni_modules/uview-plus/libs/config/props/indexList.js");
require("../../uni_modules/uview-plus/libs/config/props/input.js");
require("../../uni_modules/uview-plus/libs/config/props/keyboard.js");
require("../../uni_modules/uview-plus/libs/config/props/line.js");
require("../../uni_modules/uview-plus/libs/config/props/lineProgress.js");
require("../../uni_modules/uview-plus/libs/config/props/link.js");
require("../../uni_modules/uview-plus/libs/config/props/list.js");
require("../../uni_modules/uview-plus/libs/config/props/listItem.js");
require("../../uni_modules/uview-plus/libs/config/props/loadingIcon.js");
require("../../uni_modules/uview-plus/libs/config/props/loadingPage.js");
require("../../uni_modules/uview-plus/libs/config/props/loadmore.js");
require("../../uni_modules/uview-plus/libs/config/props/modal.js");
require("../../uni_modules/uview-plus/libs/config/props/navbar.js");
require("../../uni_modules/uview-plus/libs/config/color.js");
require("../../uni_modules/uview-plus/libs/config/props/noNetwork.js");
require("../../uni_modules/uview-plus/libs/config/props/noticeBar.js");
require("../../uni_modules/uview-plus/libs/config/props/notify.js");
require("../../uni_modules/uview-plus/libs/config/props/numberBox.js");
require("../../uni_modules/uview-plus/libs/config/props/numberKeyboard.js");
require("../../uni_modules/uview-plus/libs/config/props/overlay.js");
require("../../uni_modules/uview-plus/libs/config/props/parse.js");
require("../../uni_modules/uview-plus/libs/config/props/picker.js");
require("../../uni_modules/uview-plus/libs/config/props/popup.js");
require("../../uni_modules/uview-plus/libs/config/props/radio.js");
require("../../uni_modules/uview-plus/libs/config/props/radioGroup.js");
require("../../uni_modules/uview-plus/libs/config/props/rate.js");
require("../../uni_modules/uview-plus/libs/config/props/readMore.js");
require("../../uni_modules/uview-plus/libs/config/props/row.js");
require("../../uni_modules/uview-plus/libs/config/props/rowNotice.js");
require("../../uni_modules/uview-plus/libs/config/props/scrollList.js");
require("../../uni_modules/uview-plus/libs/config/props/search.js");
require("../../uni_modules/uview-plus/libs/config/props/section.js");
require("../../uni_modules/uview-plus/libs/config/props/skeleton.js");
require("../../uni_modules/uview-plus/libs/config/props/slider.js");
require("../../uni_modules/uview-plus/libs/config/props/statusBar.js");
require("../../uni_modules/uview-plus/libs/config/props/steps.js");
require("../../uni_modules/uview-plus/libs/config/props/stepsItem.js");
require("../../uni_modules/uview-plus/libs/config/props/sticky.js");
require("../../uni_modules/uview-plus/libs/config/props/subsection.js");
require("../../uni_modules/uview-plus/libs/config/props/swipeAction.js");
require("../../uni_modules/uview-plus/libs/config/props/swipeActionItem.js");
require("../../uni_modules/uview-plus/libs/config/props/swiper.js");
require("../../uni_modules/uview-plus/libs/config/props/swipterIndicator.js");
require("../../uni_modules/uview-plus/libs/config/props/switch.js");
require("../../uni_modules/uview-plus/libs/config/props/tabbar.js");
require("../../uni_modules/uview-plus/libs/config/props/tabbarItem.js");
require("../../uni_modules/uview-plus/libs/config/props/tabs.js");
require("../../uni_modules/uview-plus/libs/config/props/tag.js");
require("../../uni_modules/uview-plus/libs/config/props/text.js");
require("../../uni_modules/uview-plus/libs/config/props/textarea.js");
require("../../uni_modules/uview-plus/libs/config/props/toast.js");
require("../../uni_modules/uview-plus/libs/config/props/toolbar.js");
require("../../uni_modules/uview-plus/libs/config/props/tooltip.js");
require("../../uni_modules/uview-plus/libs/config/props/transition.js");
require("../../uni_modules/uview-plus/libs/config/props/upload.js");
require("../../uni_modules/uview-plus/libs/config/zIndex.js");
require("../../uni_modules/uview-plus/libs/function/platform.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  _easycom_up_button2();
}
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_up_button();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const userStore = stores_userStore.useUserStore();
    const uerInfo = common_vendor.ref({});
    const userAllData = common_vendor.ref({});
    const login = common_vendor.ref();
    const version = common_vendor.ref("");
    const count = common_vendor.reactive([
      {
        num: "-",
        text: "我的卡片",
        path: "my-post"
      },
      {
        num: "-",
        text: "我的帖子",
        path: "my-post"
      },
      {
        num: "-",
        text: "历史记录",
        path: "my-local"
      }
    ]);
    const navs = common_vendor.reactive([
      {
        icon: "&#xe791;",
        text: "随机测试",
        path: "answer",
        name: "meiridati1"
      },
      {
        icon: "",
        text: "签到",
        path: "sign",
        name: "qiandao"
      },
      {
        icon: "",
        text: "我的发布",
        path: "my-post",
        name: "wodefabu1"
      },
      {
        icon: "",
        text: "答题数据",
        name: "zuotitongji"
      }
    ]);
    const goLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const jump = (e) => {
      common_vendor.index.navigateTo({
        url: `/pages/${e.path}/${e.path}`
      });
    };
    const checkLogin = () => {
      const userData = common_vendor.index.getStorageSync("userData");
      if (userData) {
        uerInfo.value = userData;
        login.value = true;
      } else {
        login.value = false;
      }
      return userData ? true : false;
    };
    const init = () => {
      const cardLength = userAllData.value.cardLength;
      const postsLength = userAllData.value.posts.length;
      const watchedCardHistoryLenght = userAllData.value.watchedCardHistory.length;
      count[0].num = cardLength;
      count[1].num = postsLength;
      count[2].num = watchedCardHistoryLenght;
    };
    const logOut = () => {
      if (!uerInfo) {
        common_vendor.index.showToast({
          title: "当前未登录账号",
          icon: "none"
        });
        return;
      }
      userStore.logout();
      common_vendor.index.showToast({
        title: "退出成功",
        icon: "none"
      });
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    };
    const jumpToSetting = () => {
      if (!checkLogin()) {
        common_vendor.index.showToast({
          title: "未登录",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/setting/setting?id=${uerInfo.value.id}`
      });
    };
    common_vendor.onMounted(async () => {
      if (checkLogin()) {
        const ids = common_vendor.index.getStorageSync("userData");
        if (ids) {
          api_user.getUserData(ids.id).then((res) => {
            userAllData.value = res.data;
            init();
          }).catch((e) => {
            console.log(e);
          });
        } else {
          return;
        }
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: login.value
      }, login.value ? {
        b: login.value ? uerInfo.value.avatar : _ctx.avatarUrl,
        c: common_vendor.t(login.value ? uerInfo.value.username : "您未登录"),
        d: !login.value ? "logo-hover" : ""
      } : {}, {
        e: !login.value
      }, !login.value ? {
        f: common_vendor.o(goLogin),
        g: common_vendor.p({
          type: "primary",
          text: "点击登录"
        })
      } : {}, {
        h: common_vendor.f(count, (c, index, i0) => {
          return {
            a: common_vendor.t(c.num),
            b: common_vendor.t(c.text),
            c: common_vendor.o(($event) => jump(c))
          };
        }),
        i: common_vendor.f(navs, (nav, index, i0) => {
          return {
            a: common_vendor.t(nav.text),
            b: common_vendor.n(`t-icon-color-${nav.name}`),
            c: nav.path,
            d: common_vendor.o(($event) => jump(nav), nav.path)
          };
        }),
        j: common_vendor.o(($event) => jumpToSetting()),
        k: common_vendor.o(logOut),
        l: common_vendor.t(version.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
