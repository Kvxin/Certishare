"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userStore = require("../../stores/userStore.js");
const api_card = require("../../api/card.js");
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
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  (_easycom_u_image2 + _easycom_u_swiper2 + _easycom_u_line2 + _easycom_up_image2 + _easycom_u_search2)();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_swiper = () => "../../uni_modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_u_line = () => "../../uni_modules/uview-plus/components/u-line/u-line.js";
const _easycom_up_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_swiper + _easycom_u_line + CommentsWarp + _easycom_up_image + _easycom_u_search + CommentBlockVue)();
}
const CommentsWarp = () => "../../components/CommentsWarp/CommentsWarp.js";
const CommentBlockVue = () => "../../components/CommentBlock/CommentBlock.js";
const _sfc_main = {
  __name: "card-info",
  setup(__props) {
    const author = common_vendor.ref({});
    const show = common_vendor.ref(false);
    const cardDatas = common_vendor.ref({});
    const images = common_vendor.ref([]);
    const comment = common_vendor.ref([]);
    const id = common_vendor.ref("");
    const userStore = stores_userStore.useUserStore();
    const userData = userStore.getUserData;
    const getInfo = () => {
      api_card.getCardInfo(id.value).then((res) => {
        cardDatas.value = res.data;
        comment.value = res.data.comment;
        author.value = res.data.author;
        images.value = res.data.images;
      });
      api_card.addToWatchedHistory(userData.id, id.value);
    };
    const formatTime = (timestamp) => {
      return common_vendor.hooks(parseInt(timestamp)).format("YYYY-MM-DD HH:mm:ss");
    };
    const addLike = () => {
      const cardId = cardDatas.value._id;
      const userId = userData.id;
      api_card.setLikeCard(cardId, userId).then((res) => {
        console.log(res);
      });
    };
    const ToPersonPage = () => {
    };
    const _getComment = () => {
      api_card.getCardInfo(id.value).then((res) => {
        const commentData = res.data.comment;
        commentData.map((comment2) => {
          comment2.createdAt = formatTime(comment2.createdAt);
          return comment2;
        });
        comment.value = res.data.comment;
      });
    };
    const showMask = () => {
      console.log("gagga");
      common_vendor.index.$emit("showMask");
    };
    common_vendor.onLoad((options) => {
      id.value = options.id;
      if (!userData) {
        common_vendor.index.showToast({
          title: "未登录状态",
          icon: "none"
        });
        common_vendor.index.redirectTo({
          url: "/pages/login/login"
        });
        return;
      }
      getInfo();
      common_vendor.index.$on("reGetComment", () => {
        _getComment();
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: author.value.avatar,
          height: "48",
          width: "48"
        }),
        b: common_vendor.t(author.value.username),
        c: common_vendor.t(common_vendor.unref(common_vendor.hooks)(Number(cardDatas.value.createdAt)).format("YYYY-MM-DD")),
        d: common_vendor.o(ToPersonPage),
        e: common_vendor.p({
          list: images.value,
          indicator: true,
          height: "500"
        }),
        f: common_vendor.t(cardDatas.value.title),
        g: common_vendor.t(cardDatas.value.content),
        h: common_vendor.f(cardDatas.value.tags, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: common_vendor.o(($event) => _ctx.JumpSearchTag(tag))
          };
        }),
        i: common_vendor.t(Math.floor(Math.random() * 70)),
        j: common_vendor.p({
          length: "90%"
        }),
        k: common_vendor.t(comment.value.length),
        l: common_vendor.p({
          commentData: comment.value
        }),
        m: common_vendor.p({
          ["show-loading"]: true,
          shape: "circle",
          width: "32px",
          height: "32px",
          src: common_vendor.unref(userData).avatar
        }),
        n: common_vendor.o(showMask),
        o: common_vendor.p({
          placeholder: "评论一句吧~",
          disabled: true,
          ["search-icon"]: "more-circle",
          actionText: "",
          showAction: false
        }),
        p: common_vendor.o(addLike),
        q: show.value
      }, show.value ? {
        r: common_vendor.o((...args) => _ctx.hideMask && _ctx.hideMask(...args))
      } : {}, {
        s: common_vendor.p({
          userData: common_vendor.unref(userData),
          cardDatas: cardDatas.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-54021bdd"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/card-info/card-info.vue"]]);
wx.createPage(MiniProgramPage);
