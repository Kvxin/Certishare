"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
const _sfc_main = {
  __name: "AnswerResultEcharts",
  props: {
    types: Object
  },
  setup(__props) {
    const chartData = common_vendor.ref({});
    const props = __props;
    const opts = common_vendor.ref({
      color: [
        "#1890FF",
        "#91CB74",
        "#FAC858",
        "#EE6666",
        "#73C0DE",
        "#3CA272",
        "#FC8452",
        "#9A60B4",
        "#ea7ccc"
      ],
      padding: [5, 5, 5, 5],
      enableScroll: false,
      extra: {
        pie: {
          activeOpacity: 0.5,
          activeRadius: 10,
          offsetAngle: 0,
          labelWidth: 15,
          border: true,
          borderWidth: 3,
          borderColor: "#FFFFFF",
          linearType: "custom"
        }
      }
    });
    const getServerData = () => {
      let seriesData = Object.keys(props.types).map((key) => ({
        name: key,
        // 属性名作为name
        value: props.types[key]
        // 属性值作为value
      }));
      let res = {
        series: [
          {
            data: seriesData
          }
        ]
      };
      chartData.value = JSON.parse(JSON.stringify(res));
    };
    common_vendor.onMounted(() => {
      getServerData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "pie",
          opts: opts.value,
          chartData: chartData.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/AnswerResultEcharts/AnswerResultEcharts.vue"]]);
wx.createComponent(Component);
