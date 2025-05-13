"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  _easycom_mp_html2();
}
const _easycom_mp_html = () => "../mp-html/mp-html.js";
if (!Math) {
  _easycom_mp_html();
}
const _sfc_main = {
  __name: "Html",
  props: {
    html: String
  },
  setup(__props) {
    const tagStyle = common_vendor.ref({
      table: "box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;",
      th: "border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;",
      td: "border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;",
      li: "margin: 5px 0;"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["container-style"]: "padding:20px",
          content: __props.html,
          domain: "https://mp-html.oss-cn-hangzhou.aliyuncs.com",
          ["lazy-load"]: true,
          ["scroll-table"]: true,
          selectable: true,
          ["use-anchor"]: true,
          ["tag-style"]: tagStyle.value,
          markdown: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/Html/Html.vue"]]);
wx.createComponent(Component);
