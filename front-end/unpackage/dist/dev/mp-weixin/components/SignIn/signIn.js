"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "signIn",
  props: {
    isReplenishSign: {
      type: Boolean,
      default: false
    },
    isFullCalendar: {
      type: Boolean,
      default: true
    },
    yearMonth: {
      type: String,
      default: () => `${(/* @__PURE__ */ new Date()).getFullYear()}-${(/* @__PURE__ */ new Date()).getMonth() + 1}`
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    langType: {
      type: String,
      default: "ch"
      //en
    }
  },
  setup(__props) {
    const props = __props;
    const calendarDays = common_vendor.ref([]);
    const SignData = common_vendor.ref([]);
    const nowYear = common_vendor.ref(0);
    const nowMonth = common_vendor.ref(0);
    const today = common_vendor.ref(parseInt((/* @__PURE__ */ new Date()).getDate()));
    const toMonth = common_vendor.ref(parseInt((/* @__PURE__ */ new Date()).getMonth() + 1));
    const toYear = common_vendor.ref(parseInt((/* @__PURE__ */ new Date()).getFullYear()));
    const weeksTxt = common_vendor.ref({
      ch: ["日", "一", "二", "三", "四", "五", "六"],
      en: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
    });
    const toIOSDate = (strDate) => {
      return strDate ? strDate.replace(/-/g, "/") : strDate;
    };
    const getMonthDayLength = (year, month) => {
      return new Date(year, month, 0).getDate();
    };
    const getFirstDayOfWeek = (year, month, day = 1) => {
      return new Date(Date.UTC(year, month - 1, day)).getDay();
    };
    const getOperateMonthDate = (yy, mm, num) => {
      let month = parseInt(mm) + parseInt(num);
      let year = parseInt(yy);
      if (month > 12) {
        month = 1;
        year++;
      } else if (month < 1) {
        month = 12;
        year--;
      }
      return { month, year };
    };
    const clickSign = (date, type) => {
      var strTip = "签到";
      if (type == 0) {
        if (!props.isReplenishSign) {
          console.log("————补签功能未开启————");
          return;
        }
        strTip = "补签";
      }
      common_vendor.index.showToast({
        title: date + "号" + strTip + "成功",
        icon: "success",
        position: "bottom"
      });
      common_vendor.index.$emit("clickChange", nowYear.value + "-" + nowMonth.value + "-" + date);
    };
    const buildCalendar = (y, m) => {
      nowYear.value = y;
      nowMonth.value = m;
      calculateEmptyGrids(y, m);
      calculateDays(y, m);
      if (props.isFullCalendar) {
        fullCell();
      }
    };
    const onSignDataChange = (newData, oldData = []) => {
      SignData.value = newData;
      matchSign();
    };
    const matchSign = () => {
      console.log("执行了");
      var signs = SignData.value;
      var daysArr = calendarDays.value;
      for (var i = 0; i < signs.length; i++) {
        var current = new Date(toIOSDate(signs[i])).getTime();
        for (var j = 0; j < daysArr.length; j++) {
          if (current == new Date(toIOSDate(daysArr[j].fullDate)).getTime()) {
            daysArr[j].isSign = true;
          }
        }
      }
      calendarDays.value = daysArr;
    };
    const calculateEmptyGrids = (year, month) => {
      calendarDays.value = [];
      const firstDayOfWeek = getFirstDayOfWeek(year, month);
      if (firstDayOfWeek > 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
          calendarDays.value.push({
            date: null,
            fullDate: null,
            isBeforeToday: true,
            isSign: false,
            isThisMonth: false
          });
        }
      }
    };
    const calculateDays = (year, month) => {
      const thisMonthDays = getMonthDayLength(year, month);
      const toDate = /* @__PURE__ */ new Date(toYear.value + "/" + toMonth.value + "/" + today.value);
      for (let i = 1; i <= thisMonthDays; i++) {
        const fullDate = year + "-" + month + "-" + i;
        const isBeforeToday = new Date(toIOSDate(fullDate)) < toDate;
        calendarDays.value.push({
          date: i,
          fullDate,
          isBeforeToday,
          isSign: false,
          isThisMonth: true
        });
      }
    };
    const changeMonth = (type) => {
      const nowYear2 = parseInt(nowYear2.value);
      const nowMonth2 = parseInt(nowMonth2.value);
      const newObj = getOperateMonthDate(nowYear2, nowMonth2, type);
      buildCalendar(newObj.year, newObj.month);
      common_vendor.index.$emit("dateChange", nowYear2.value + "-" + nowMonth2.value);
    };
    const fullCell = () => {
      const endDay = getMonthDayLength(nowYear.value, nowMonth.value);
      const beforeEmptyLength = getFirstDayOfWeek(nowYear.value, nowMonth.value);
      const afterEmptyLength = 6 - getFirstDayOfWeek(nowYear.value, nowMonth.value, endDay);
      const last = getOperateMonthDate(nowYear.value, nowMonth.value, -1);
      const lastMonthEndDay = getMonthDayLength(last.year, last.month);
      for (let i = 0; i < beforeEmptyLength; i++) {
        const date = lastMonthEndDay - beforeEmptyLength + i + 1;
        calendarDays.value[i].date = date;
        calendarDays.value[i].fullDate = last.year + "-" + last.month + "-" + date;
      }
      const next = getOperateMonthDate(nowYear.value, nowMonth.value, 1);
      for (let i = 1; i <= afterEmptyLength; i++) {
        calendarDays.value.push({
          date: i,
          // 显示的日期
          fullDate: next.year + "-" + next.month + "-" + i,
          // 日期yyyy-mm-dd格式
          isBeforeToday: false,
          // 今日之前
          isSign: false,
          // 是否签到
          isThisMonth: false
          // 是本月
        });
      }
    };
    common_vendor.watch(
      () => props.dataSource,
      (newData, oldData) => {
        SignData.value = newData;
        matchSign();
      },
      {
        deep: true
      }
    );
    common_vendor.onMounted(() => {
      if (!/en|ch/g.test(props.langType)) {
        props.langType = "ch";
      }
      const ymArr = props.yearMonth.split("-");
      buildCalendar(ymArr[0], ymArr[1]);
      onSignDataChange(props.dataSource);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.langType == "ch" ? "上一月" : "Last"),
        b: common_vendor.o(($event) => changeMonth(-1)),
        c: common_vendor.t(nowYear.value || "--"),
        d: common_vendor.t(nowMonth.value || "--"),
        e: common_vendor.t(__props.langType == "ch" ? "下一月" : "Nex/"),
        f: common_vendor.o(($event) => changeMonth(1)),
        g: common_vendor.f(weeksTxt.value[__props.langType], (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        h: common_vendor.f(calendarDays.value, (item, j, i0) => {
          return common_vendor.e({
            a: item.date == void 0 || item.date == null
          }, item.date == void 0 || item.date == null ? {} : common_vendor.e({
            b: item.isSign == true
          }, item.isSign == true ? {
            c: common_vendor.t(item.date)
          } : item.isBeforeToday && item.isThisMonth ? {
            e: common_vendor.t(item.date),
            f: common_vendor.o(($event) => clickSign(item.date, 0), j)
          } : item.date == today.value && nowMonth.value == toMonth.value && nowYear.value == toYear.value ? {
            h: common_vendor.o(($event) => clickSign(item.date, 1), j)
          } : {
            i: common_vendor.t(item.date)
          }, {
            d: item.isBeforeToday && item.isThisMonth,
            g: item.date == today.value && nowMonth.value == toMonth.value && nowYear.value == toYear.value
          }), {
            j
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/SignIn/signIn.vue"]]);
wx.createComponent(Component);
