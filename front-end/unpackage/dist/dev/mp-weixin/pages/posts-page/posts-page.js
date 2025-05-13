"use strict";
const common_vendor = require("../../common/vendor.js");
const api_search = require("../../api/search.js");
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
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + common_vendor.unref(noDataVue) + common_vendor.unref(ArticlePropsWarpVue))();
}
const noDataVue = () => "../../components/noData/noData.js";
const ArticlePropsWarpVue = () => "../../components/ArticlePropsWarp/ArticlePropsWarp.js";
const _sfc_main = {
  __name: "posts-page",
  setup(__props) {
    const id = common_vendor.ref("");
    const searchData = common_vendor.ref([]);
    const title = common_vendor.ref(``);
    const back = () => {
      common_vendor.index.navigateBack();
    };
    const init = () => {
      api_search.SarchPosts(id.value).then((res) => {
        searchData.value = res.data;
      });
    };
    common_vendor.onLoad((options) => {
      id.value = options.id;
      title.value = `搜索结果:${id.value}`;
      init();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(back),
        b: common_vendor.p({
          ["left-text"]: "返回",
          title: title.value
        }),
        c: common_vendor.t(`找到关于${id.value}的结果一共有 ${searchData.value.length} 条 `),
        d: searchData.value.length == 0
      }, searchData.value.length == 0 ? {} : {}, {
        e: common_vendor.p({
          posts: searchData.value
        }),
        f: searchData.value.length == 0 ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/posts-page/posts-page.vue"]]);
wx.createPage(MiniProgramPage);
