"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_u_swiper2 + _easycom_up_image2 + _easycom_uni_icons2)();
}
const _easycom_u_swiper = () => "../../uni_modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_up_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_u_swiper + _easycom_up_image + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "Card",
  props: {
    cardInfo: Object
  },
  setup(__props) {
    const props = __props;
    const imgList = common_vendor.ref(props.cardInfo.images || []);
    const author = props.cardInfo.author;
    const likeNumber = props.cardInfo.like;
    const title = props.cardInfo.title;
    const height = common_vendor.ref(Math.floor(Math.random() * (300 - 200) + 200));
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: imgList.value,
          height: height.value,
          autoplay: false
        }),
        b: height.value + "px",
        c: common_vendor.t(common_vendor.unref(title)),
        d: common_vendor.p({
          ["show-loading"]: true,
          src: common_vendor.unref(author).avatar,
          width: "32px",
          height: "32px",
          shape: "circle"
        }),
        e: common_vendor.t(common_vendor.unref(author).username),
        f: common_vendor.p({
          type: "heart",
          size: "18"
        }),
        g: common_vendor.t(common_vendor.unref(likeNumber))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/Card/Card.vue"]]);
wx.createComponent(Component);
