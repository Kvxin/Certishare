"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PostPageTopSwiper",
  setup(__props) {
    const list = common_vendor.ref([
      {
        name: "python"
      },
      {
        name: "android"
      },
      {
        name: "vim"
      },
      {
        name: "cpp"
      },
      {
        name: "django"
      },
      {
        name: "go"
      },
      {
        name: "json"
      },
      {
        name: "php"
      },
      {
        name: "powershell"
      },
      {
        name: "sass"
      }
    ]);
    const t = (e) => {
      common_vendor.index.navigateTo({
        url: `/pages/posts-page/posts-page?id=${e.name}`
      });
    };
    const chunkedList = common_vendor.computed(() => {
      const result = [];
      const chunkSize = 8;
      for (let i = 0; i < list.value.length; i += chunkSize) {
        result.push(list.value.slice(i, i + chunkSize));
      }
      return result;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(chunkedList.value, (chunk, index, i0) => {
          return {
            a: common_vendor.f(chunk, (item, k1, i1) => {
              return {
                a: common_vendor.n(`t-icon-${item.name}`),
                b: common_vendor.t(item.name),
                c: item.name,
                d: common_vendor.o(($event) => t(item), item.name)
              };
            }),
            b: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/PostPageTopSwiper/PostPageTopSwiper.vue"]]);
wx.createComponent(Component);
