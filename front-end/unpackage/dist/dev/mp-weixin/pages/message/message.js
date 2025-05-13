"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  noDataVue();
}
const noDataVue = () => "../../components/noData/noData.js";
const _sfc_main = {
  __name: "message",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);
