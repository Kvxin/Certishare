"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  _easycom_u_divider2();
}
const _easycom_u_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
if (!Math) {
  (AnswerResultEchartsVue + _easycom_u_divider)();
}
const AnswerResultEchartsVue = () => "../../components/AnswerResultEcharts/AnswerResultEcharts.js";
const _sfc_main = {
  __name: "answer-result",
  setup(__props) {
    let result = common_vendor.ref({});
    common_vendor.ref([]);
    const reback = () => {
      common_vendor.index.navigateTo({
        url: "/pages/answer/answer"
      });
    };
    const back = () => {
      common_vendor.index.switchTab({
        url: "/pages/my/my"
      });
    };
    common_vendor.onLoad((option) => {
      if (option.result) {
        const parsedResult = JSON.parse(decodeURIComponent(option.result));
        result.value = parsedResult.data;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          types: common_vendor.unref(result).typeWrongCount
        }),
        b: common_vendor.t(10),
        c: common_vendor.t(10 - common_vendor.unref(result).wrongCount),
        d: common_vendor.t(common_vendor.unref(result).passingRate),
        e: common_vendor.f(common_vendor.unref(result).wrongQuestions, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.optionsData, (p, index2, i1) => {
              return {
                a: common_vendor.t(index2),
                b: common_vendor.t(p)
              };
            }),
            c: common_vendor.t(item.userAnswer),
            d: common_vendor.t(item.correctAnswer),
            e: common_vendor.t(item.analysis),
            f: "17262fcb-2-" + i0
          };
        }),
        f: common_vendor.o(reback),
        g: common_vendor.o(back)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17262fcb"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/answer-result/answer-result.vue"]]);
wx.createPage(MiniProgramPage);
