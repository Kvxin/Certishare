"use strict";
const common_vendor = require("../../common/vendor.js");
const api_card = require("../../api/card.js");
const stores_systemStore = require("../../stores/systemStore.js");
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
if (!Math) {
  CardVue();
}
const CardVue = () => "../Card/Card.js";
const _sfc_main = {
  __name: "CardWarp",
  setup(__props) {
    const cardsData = common_vendor.ref([]);
    const leftColumnCards = common_vendor.ref([]);
    const rightColumnCards = common_vendor.ref([]);
    const height = common_vendor.ref(1e3);
    const useSystemStore = stores_systemStore.systemStore();
    useSystemStore.getSystemNav;
    const isLodding = common_vendor.ref(false);
    let _this = common_vendor.getCurrentInstance();
    const getCardList_ = async () => {
      await api_card.getCardList().then((res) => {
        cardsData.value = res.data;
        cardsData.value = processImages(cardsData.value);
      });
    };
    function distributeCards() {
      leftColumnCards.value = [];
      rightColumnCards.value = [];
      cardsData.value.forEach((card, index) => {
        if (index % 2 === 0) {
          leftColumnCards.value.push(card);
        } else {
          rightColumnCards.value.push(card);
        }
      });
    }
    const changeCardList = (e) => {
      if (e == "推荐")
        return;
      isLodding.value = true;
      api_card.getTypeList(e).then((res) => {
        if (res.data.code == 200) {
          common_vendor.index.showToast({
            title: "获取成功",
            icon: "none"
          });
          cardsData.value = res.data.cardList;
          cardsData.value = processImages(cardsData.value);
          distributeCards();
          setTimeout(() => {
            getCardListWarpHeight();
          });
        } else {
          common_vendor.index.showToast({
            title: `${res.data.error}`,
            icon: "none"
          });
        }
      }).finally(() => {
        isLodding.value = false;
      });
    };
    const setupIntersectionObserver = () => {
      const observer = common_vendor.index.createIntersectionObserver(_this, {
        thresholds: [0.9]
      });
      observer.relativeToViewport({ bottom: 20 });
      observer.observe(".load__more", (res) => {
        if (res.intersectionRatio > 0) {
          loadMore();
        }
      });
    };
    const loadMore = () => {
      api_card.getCardList().then((res) => {
        cardsData.value = [...cardsData.value, ...res.data];
        cardsData.value = processImages(cardsData.value);
        distributeCards();
        setTimeout(() => {
          getCardListWarpHeight();
        });
      });
    };
    const processImages = (cardsData2) => {
      cardsData2.forEach((card) => {
        if (card.images && card.images.length > 0) {
          card.images = card.images.map((imageUrl) => {
            return `${imageUrl}?imageMogr2/auto-orient/thumbnail/!30p/interlace/1/blur/1x0/quality/75`;
          });
        }
      });
      return cardsData2;
    };
    const jump = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/card-info/card-info?id=${id}`
      });
    };
    const getCardListWarpHeight = () => {
      const query = common_vendor.index.createSelectorQuery().in(_this);
      query.select(".card-warp").boundingClientRect((data) => {
        let newData = JSON.parse(JSON.stringify(data));
        height.value = newData.height;
      }).exec();
    };
    const handleSwiperChange = (event) => {
      const currentIndex = event.detail.current;
      common_vendor.index.$emit("changeNav", currentIndex);
    };
    common_vendor.onMounted(async () => {
      common_vendor.index.$emit("showLodding");
      common_vendor.index.$on("changeCardDatas", changeCardList);
      await getCardList_();
      distributeCards();
      setTimeout(() => {
        getCardListWarpHeight();
        common_vendor.index.$emit("closeLodding");
        setupIntersectionObserver();
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(leftColumnCards.value, (item, index, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(($event) => jump(item._id), item.id),
            c: "33a567c5-0-" + i0,
            d: common_vendor.p({
              cardInfo: item
            })
          };
        }),
        b: common_vendor.f(rightColumnCards.value, (item, index, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(($event) => jump(item._id), item.id),
            c: "33a567c5-1-" + i0,
            d: common_vendor.p({
              cardInfo: item
            })
          };
        }),
        c: height.value + 150 + "px",
        d: common_vendor.o(handleSwiperChange)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33a567c5"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/CardWarp/CardWarp.vue"]]);
wx.createComponent(Component);
