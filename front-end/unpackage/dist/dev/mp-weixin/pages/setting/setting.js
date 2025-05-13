"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const stores_userStore = require("../../stores/userStore.js");
const api_uploads = require("../../api/uploads.js");
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
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  (_easycom_u_button2 + _easycom_u__input2 + _easycom_u_form_item2 + _easycom_u_icon2 + _easycom_u__textarea2 + _easycom_u__form2 + _easycom_u_action_sheet2)();
}
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__textarea = () => "../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
const _easycom_u__form = () => "../../uni_modules/uview-plus/components/u--form/u--form.js";
const _easycom_u_action_sheet = () => "../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_u_button + _easycom_u__input + _easycom_u_form_item + _easycom_u_icon + _easycom_u__textarea + _easycom_u__form + _easycom_u_action_sheet)();
}
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const userStore = stores_userStore.useUserStore();
    const userInfo_ = userStore.getUserData;
    const user = common_vendor.ref({});
    const showSex = common_vendor.ref(false);
    const imagesTempURL = common_vendor.ref("");
    const actions = [
      {
        name: "男"
      },
      {
        name: "女"
      }
    ];
    const sexSelect = (e) => {
      user.value.gender = e.name;
      console.log(user.value);
    };
    const back = () => {
      common_vendor.index.navigateBack();
    };
    const changeAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          imagesTempURL.value = res.tempFilePaths[0];
          const imgList = [imagesTempURL.value];
          uploadImgPromise(imgList);
        }
      });
    };
    const uploadImgPromise = async (e) => {
      const res = await api_uploads.uploadImages(e);
      user.value.avatar = res.fileNames[0];
    };
    const changeProfileBackground = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          imagesTempURL.value = res.tempFilePaths[0];
          const imgList = [imagesTempURL.value];
          uploadBackGroundFilePromise(imgList);
        }
      });
    };
    const uploadBackGroundFilePromise = async (e) => {
      const res = await api_uploads.uploadImages(e);
      user.value.profileBackground = res.fileNames[0];
    };
    const setUser = (e) => {
      const data = {
        userData: e
      };
      userStore.updataUser(data);
    };
    const updata = async () => {
      const uid = userInfo_.uid;
      api_user.updateUserInformation(uid, {
        username: user.value.username,
        gender: user.value.gender,
        avatar: user.value.avatar,
        profileBackground: user.value.profileBackground
      }).then((res) => {
        common_vendor.index.showToast({
          title: "更新成功",
          icon: "none"
        });
        setUser(res.data.updatedUser);
      }).catch((e) => {
        console.log("错了,", e);
      });
    };
    const submitInfo = async () => {
      common_vendor.index.showLoading({
        title: "正在提交中..."
      });
      await updata();
    };
    const init = async () => {
      const userData = common_vendor.index.getStorageSync("userData");
      const users = await api_user.getUserData(userData.id);
      user.value = users.data;
    };
    common_vendor.onMounted(() => {
      init();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(back),
        b: common_vendor.o(submitInfo),
        c: common_vendor.p({
          type: "primary",
          size: "mini"
        }),
        d: user.value.profileBackground,
        e: common_vendor.o(changeProfileBackground),
        f: user.value.avatar,
        g: common_vendor.o(changeAvatar),
        h: common_vendor.o(($event) => user.value.username = $event),
        i: common_vendor.p({
          border: "none",
          modelValue: user.value.username
        }),
        j: common_vendor.sr("item1", "4b4d6331-2,4b4d6331-1"),
        k: common_vendor.p({
          label: "姓名",
          prop: "userInfo.username",
          borderBottom: true
        }),
        l: common_vendor.o(($event) => user.value.gender = $event),
        m: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "请选择性别",
          border: "none",
          modelValue: user.value.gender
        }),
        n: common_vendor.p({
          name: "arrow-right"
        }),
        o: common_vendor.o(($event) => {
          showSex.value = true;
          _ctx.hideKeyboard();
        }),
        p: common_vendor.p({
          label: "性别",
          borderBottom: true
        }),
        q: common_vendor.o(($event) => user.value.personSignature = $event),
        r: common_vendor.p({
          placeholder: "请输入内容",
          count: true,
          maxlength: "120",
          modelValue: user.value.personSignature
        }),
        s: common_vendor.sr("item1", "4b4d6331-7,4b4d6331-1"),
        t: common_vendor.p({
          label: "介绍",
          prop: "userInfo.name",
          borderBottom: true
        }),
        v: common_vendor.sr("uForm", "4b4d6331-1"),
        w: common_vendor.p({
          labelPosition: "left",
          model: user.value
        }),
        x: common_vendor.o(($event) => showSex.value = false),
        y: common_vendor.o(sexSelect),
        z: common_vendor.p({
          show: showSex.value,
          actions,
          title: "请选择性别"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
