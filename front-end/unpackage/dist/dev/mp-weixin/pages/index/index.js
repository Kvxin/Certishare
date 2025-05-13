"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/counter.js");
if (!Array) {
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  _easycom_u_sticky2();
}
const _easycom_u_sticky = () => "../../uni_modules/uview-plus/components/u-sticky/u-sticky.js";
if (!Math) {
  (NavWarp + dragVue + SearchWarp + CarouselWarp + NavBarVue + _easycom_u_sticky + CardWarp + PostPageTopSwiperVue + NoticeVue + ArticleWarp + LoddingVue)();
}
const NavWarp = () => "../../components/NavWarp/NavWarp.js";
const SearchWarp = () => "../../components/SearchWarp/SearchWarp.js";
const CarouselWarp = () => "../../components/CarouselWarp/CarouselWarp.js";
const CardWarp = () => "../../components/CardWarp/CardWarp.js";
const NavBarVue = () => "../../components/NavBar/NavBar.js";
const dragVue = () => "../../components/drag/drag.js";
const PostPageTopSwiperVue = () => "../../components/PostPageTopSwiper/PostPageTopSwiper.js";
const NoticeVue = () => "../../components/Notice/Notice.js";
const ArticleWarp = () => "../../components/ArticleWarp/ArticleWarp.js";
const LoddingVue = () => "../../components/Lodding/Lodding.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref();
    const showIndex = common_vendor.ref(true);
    const isLodding = common_vendor.ref(false);
    const changePageData = (e) => {
      showIndex.value = e;
    };
    common_vendor.onPullDownRefresh(() => {
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 3e3);
    });
    const showLodding = () => {
      isLodding.value = true;
    };
    const closeLodding = () => {
      isLodding.value = false;
    };
    common_vendor.onLoad(() => {
      common_vendor.index.$on("change-page", (e) => {
        changePageData(e);
      });
      common_vendor.index.getSystemInfo({
        success: (resu) => {
        },
        fail: (res) => {
        }
      });
      common_vendor.index.$on("showLodding", () => {
        showLodding();
      });
      common_vendor.index.$on("closeLodding", () => {
        closeLodding();
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["offset-top"]: "68"
        }),
        b: showIndex.value,
        c: !showIndex.value,
        d: isLodding.value
      }, isLodding.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
