"use strict";
const common_vendor = require("../../common/vendor.js");
const api_uploads = require("../../api/uploads.js");
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
if (!Math) {
  PostPageTypeSelectVue();
}
const PostPageTypeSelectVue = () => "../../components/PostPageTypeSelect/PostPageTypeSelect.js";
const MAX_IMAGE_LENGHT = 9;
const _sfc_main = {
  __name: "post-page",
  setup(__props) {
    common_vendor.ref("");
    const imgList = common_vendor.ref([]);
    const showSelectModel = common_vendor.ref(false);
    const fileNames = common_vendor.ref([]);
    const selectType = common_vendor.ref([]);
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    stores_userStore.useUserStore();
    const userData = common_vendor.ref({});
    common_vendor.ref();
    const ChooseImage = () => {
      common_vendor.index.chooseImage({
        count: MAX_IMAGE_LENGHT,
        //默认9
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: (res) => {
          if (imgList.value.length != 0) {
            imgList.value.concat(res.tempFilePaths);
          } else {
            imgList.value = res.tempFilePaths;
          }
        }
      });
    };
    const ViewImage = (e) => {
      common_vendor.index.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url
      });
    };
    const showTypeActionSheet = () => {
      showSelectModel.value = true;
    };
    const DelImg = (e) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这个照片吗？",
        cancelText: "再看看",
        confirmText: "删除",
        success: (res) => {
          if (res.confirm) {
            imgList.value.splice(e.currentTarget.dataset.index, 1);
            imgList.value = imgList.value;
          }
        }
      });
    };
    const submit = () => {
      if (checkLogin()) {
        if (title.value == "" || content.value == "" || imgList.value.length == 0) {
          common_vendor.index.showToast({
            title: "请填写所有信息",
            icon: "none"
          });
          return;
        }
        common_vendor.index.showLoading({
          title: "正在上传图片"
        });
        api_uploads.uploadImages(imgList.value).then((res) => {
          fileNames.value = res.fileNames;
          common_vendor.index.hideLoading();
          postCard();
        });
      } else {
        common_vendor.index.showToast({
          title: "当前未登录",
          icon: "none"
        });
      }
    };
    const postCard = async () => {
      const data = {
        imgList: fileNames.value,
        title: title.value,
        content: content.value,
        labels: selectType.value,
        authorId: userData.value.id
      };
      api_card.createCard(data).then((res) => {
        const id = res.data.cardId;
        common_vendor.index.navigateTo({
          url: `/pages/card-info/card-info?id=${id}`
        });
      });
    };
    const checkLogin = () => {
      const user_ = common_vendor.index.getStorageSync("userData");
      if (user_) {
        userData.value = user_;
      }
      return user_ ? true : false;
    };
    common_vendor.onMounted(() => {
      common_vendor.index.$on("setType", (e) => {
        e = e.map((e2) => `#${e2}`);
        selectType.value = e;
      });
      common_vendor.index.$on("hide", () => {
        showSelectModel.value = false;
      });
      common_vendor.index.$on("checkLogin", () => {
        checkLogin();
      });
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("setType");
      common_vendor.index.$off("hide");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: title.value,
        b: common_vendor.o(($event) => title.value = $event.detail.value),
        c: common_vendor.o((...args) => _ctx.getContentValue && _ctx.getContentValue(...args)),
        d: content.value,
        e: common_vendor.o(($event) => content.value = $event.detail.value),
        f: common_vendor.f(selectType.value, (type, index, i0) => {
          return {
            a: common_vendor.t(type),
            b: index
          };
        }),
        g: common_vendor.o(showTypeActionSheet),
        h: common_vendor.t(imgList.value.length),
        i: common_vendor.t(_ctx.MAX_IMAGE_LENGHT),
        j: common_vendor.f(imgList.value, (item, index, i0) => {
          return {
            a: imgList.value[index],
            b: common_vendor.o(DelImg, index),
            c: index,
            d: index,
            e: common_vendor.o(ViewImage, index),
            f: imgList.value[index]
          };
        }),
        k: imgList.value.length < _ctx.MAX_IMAGE_LENGHT
      }, imgList.value.length < _ctx.MAX_IMAGE_LENGHT ? {
        l: common_vendor.o(ChooseImage)
      } : {}, {
        m: common_vendor.o(submit),
        n: common_vendor.o((...args) => _ctx.formSubmit && _ctx.formSubmit(...args)),
        o: common_vendor.o(() => {
        }),
        p: common_vendor.p({
          showSelectModel: showSelectModel.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/post-page/post-page.vue"]]);
wx.createPage(MiniProgramPage);
