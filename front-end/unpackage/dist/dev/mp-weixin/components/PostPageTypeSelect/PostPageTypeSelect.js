"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  (_easycom_u_search2 + _easycom_up_button2)();
}
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_search + _easycom_up_button)();
}
const _sfc_main = {
  __name: "PostPageTypeSelect",
  props: {
    showSelectModel: Boolean
  },
  setup(__props) {
    common_vendor.ref(false);
    const typeText = common_vendor.ref("");
    const typeList = common_vendor.ref(["英语四级", "计算机设计大赛", "证书", "证", "证书", "zheng"]);
    const selectedList = common_vendor.ref([]);
    const activeIndexes = common_vendor.ref([]);
    const hide = () => {
      common_vendor.index.$emit("hide");
    };
    const toggleActive = (index) => {
      if (activeIndexes.value.includes(index)) {
        return;
      }
      if (selectedList.value.length < 4 && !selectedList.value.includes(typeList.value[index])) {
        selectedList.value.push(typeList.value[index]);
        activeIndexes.value.push(index);
      }
    };
    const isActive = (index) => {
      return activeIndexes.value.includes(index);
    };
    const removeSelected = (index) => {
      const removedItem = selectedList.value.splice(index, 1)[0];
      const typeIndex = typeList.value.indexOf(removedItem);
      const activeIndex = activeIndexes.value.indexOf(typeIndex);
      if (activeIndex > -1) {
        activeIndexes.value.splice(activeIndex, 1);
      }
    };
    const sendType = () => {
      common_vendor.index.$emit("setType", selectedList.value);
      hide();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showSelectModel
      }, __props.showSelectModel ? {
        b: common_vendor.o(hide),
        c: common_vendor.o(($event) => typeText.value = $event),
        d: common_vendor.p({
          placeholder: "搜索标签",
          borderColor: "#eee",
          bgColor: "#FFF",
          modelValue: typeText.value
        }),
        e: common_vendor.f(typeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: isActive(index) ? 1 : "",
            d: common_vendor.o(($event) => toggleActive(index), index)
          };
        }),
        f: common_vendor.f(selectedList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(removeSelected, index)
          };
        }),
        g: common_vendor.o(sendType),
        h: common_vendor.p({
          type: "primary",
          plain: true,
          text: "确定"
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/PostPageTypeSelect/PostPageTypeSelect.vue"]]);
wx.createComponent(Component);
