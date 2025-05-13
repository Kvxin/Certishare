"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_navbar2 + _easycom_u_button2)();
}
const _easycom_u_navbar = () => "../../uni_modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_button)();
}
const _sfc_main = {
  __name: "answer",
  setup(__props) {
    const questionList = [
      "javascript类",
      "前端类",
      "Rust",
      "python类",
      "公共基础",
      "css",
      "html",
      "C++",
      "Go",
      "Java"
    ];
    const selectQuestionList = common_vendor.ref([]);
    const selectedCount = common_vendor.ref(0);
    const userData = common_vendor.ref({
      answerNum: "-",
      questionNum: "-",
      passingRate: "-"
    });
    const choose = (index, item) => {
      if (selectQuestionList.value.includes(item)) {
        const selectedIndex = selectQuestionList.value.indexOf(item);
        selectQuestionList.value.splice(selectedIndex, 1);
      } else if (selectedCount.value < 3) {
        selectQuestionList.value.push(item);
      }
      selectedCount.value = selectQuestionList.value.length;
    };
    const start = () => {
      common_vendor.index.navigateTo({
        url: `/pages/knowledge/knowledge?selectQuestionList=${JSON.parse(
          JSON.stringify(selectQuestionList.value)
        )}`
      });
    };
    const init = async () => {
    };
    const back = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onMounted(() => {
      init();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(back),
        b: common_vendor.p({
          ["back-text"]: "返回",
          title: "知识问答"
        }),
        c: common_vendor.t(userData.value.answerNum),
        d: common_vendor.t(userData.value.questionNum),
        e: common_vendor.t(userData.value.passingRate),
        f: common_vendor.f(questionList, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: selectQuestionList.value.includes(item) ? 1 : "",
            d: common_vendor.o(($event) => choose(index, item), index)
          };
        }),
        g: common_vendor.t(selectedCount.value),
        h: common_vendor.o(start),
        i: common_vendor.p({
          type: "primary",
          ripple: true,
          ["ripple-bg-color"]: "#909399"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d554a45d"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/answer/answer.vue"]]);
wx.createPage(MiniProgramPage);
