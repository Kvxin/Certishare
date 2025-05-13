"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  _easycom_u_avatar2();
}
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
if (!Math) {
  _easycom_u_avatar();
}
const _sfc_main = {
  __name: "CommentsWarp",
  props: {
    commentData: Object
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.commentData.length
      }, __props.commentData.length ? {
        b: common_vendor.f(__props.commentData, (comment, index, i0) => {
          return {
            a: "af96c2a1-0-" + i0,
            b: common_vendor.p({
              src: comment.commenter.avatar
            }),
            c: common_vendor.t(comment.commenter.username),
            d: common_vendor.t(comment.content),
            e: common_vendor.t(comment.createdAt)
          };
        })
      } : {}, {
        c: !__props.commentData.length
      }, !__props.commentData.length ? {} : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-af96c2a1"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/CommentsWarp/CommentsWarp.vue"]]);
wx.createComponent(Component);
