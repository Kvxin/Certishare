"use strict";
const common_vendor = require("../../common/vendor.js");
const api_post = require("../../api/post.js");
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
  (_easycom_uni_nav_bar + HtmlVue)();
}
const HtmlVue = () => "../../components/Html/Html.js";
const _sfc_main = {
  __name: "article",
  setup(__props) {
    common_vendor.ref({
      table: "box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;",
      th: "border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;",
      td: "border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;",
      li: "margin: 5px 0;"
    });
    const postData = common_vendor.ref({});
    const userInfo = common_vendor.ref();
    const getPost = (id) => {
      api_post.getPostInfo(id).then((res) => {
        postData.value = res.data;
        userInfo.value = res.data.author;
        console.log(postData);
      });
    };
    const back = () => {
      common_vendor.index.navigateBack();
    };
    const jump = (e) => {
      common_vendor.index.navigateTo({
        url: `/pages/posts-page/posts-page?id=${e}`
      });
    };
    common_vendor.onLoad((options) => {
      getPost(options.id);
      console.log(options.id);
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: common_vendor.o(back),
        b: common_vendor.p({
          title: postData.value.title,
          fixed: true,
          statusBar: true,
          backgroundColor: "#fff",
          ["left-icon"]: "left"
        }),
        c: common_vendor.t(postData.value.title),
        d: common_vendor.t(common_vendor.unref(common_vendor.hooks)(postData.value.createAt).format("YYYY-MM-DD")),
        e: (_a = postData.value.author) == null ? void 0 : _a.avatar,
        f: common_vendor.t(((_b = postData.value.author) == null ? void 0 : _b.username) || "null"),
        g: common_vendor.t(((_c = postData.value.author) == null ? void 0 : _c.personSignature) || "null"),
        h: common_vendor.p({
          html: postData.value.content
        }),
        i: common_vendor.f(postData.value.tags, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => jump(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/article/article.vue"]]);
wx.createPage(MiniProgramPage);
