"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "ArticlePropsWarp",
  props: {
    posts: Array
  },
  setup(__props) {
    const props = __props;
    const getUserName = (name) => {
      if (name.length > 5) {
        return name.substring(0, 5) + "...";
      } else {
        return name;
      }
    };
    const formatDate = (date) => {
      return common_vendor.hooks().format("YYYY-MM-DD");
    };
    const toPostDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/article/article?id=" + id
      });
    };
    const replaceHtmlTags = (text) => {
      var reg = /<[^<>]+>/g;
      text = text.replace(reg, "");
      text = text.replace(/&nbsp;/gi, "");
      return text;
    };
    common_vendor.watch(
      () => props.posts,
      (newData, oldData) => {
        console.log("更改了");
        console.log(props.posts);
      }
    );
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.posts && props.posts.length > 0
      }, props.posts && props.posts.length > 0 ? {
        b: common_vendor.f(props.posts, (item, index, i0) => {
          return common_vendor.e({
            a: item.popular == 1
          }, item.popular == 1 ? {} : {}, {
            b: item.sticky == 1
          }, item.sticky == 1 ? {} : {}, {
            c: item.featured == 1
          }, item.featured == 1 ? {} : {}, {
            d: common_vendor.t(item.title),
            e: common_vendor.t(replaceHtmlTags(item.summary)),
            f: item.images.length > 0
          }, item.images.length > 0 ? {
            g: common_vendor.f(item.images.slice(0, 3), (img, index2, i1) => {
              return {
                a: index2,
                b: img
              };
            })
          } : {}, {
            h: item.author.avatar,
            i: common_vendor.t(getUserName(item.author.username)),
            j: common_vendor.t(formatDate(item.createdAt)),
            k: "bc16d953-0-" + i0,
            l: common_vendor.t(item.views),
            m: "bc16d953-1-" + i0,
            n: common_vendor.t(item.like),
            o: index,
            p: common_vendor.o(($event) => toPostDetail(item._id), index)
          });
        }),
        c: common_vendor.p({
          name: "eye-fill",
          color: "#666",
          size: "15"
        }),
        d: common_vendor.p({
          name: "thumb-up-fill",
          color: "#666",
          size: "15"
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bc16d953"], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/ArticlePropsWarp/ArticlePropsWarp.vue"]]);
wx.createComponent(Component);
