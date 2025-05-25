"use strict";
const common_vendor = require("../../common/vendor.js");
const SvgIcon = () => "../component/svg-icon.js";
const CustomTabbar = () => "../component/custom-tabbar.js";
const QiunDataCharts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
const _sfc_main = {
  components: {
    SvgIcon,
    CustomTabbar,
    QiunDataCharts
  },
  data() {
    return {
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['radar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#55c9c9"],
        padding: [5, 5, 0, 5],
        dataLabel: false,
        enableScroll: false,
        legend: {
          show: true,
          position: "top",
          lineHeight: 25
        },
        yAxis: {
          show: false
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow"
          }
        }
      },
      account_book_id: "",
      accountBookName: "",
      payType: 2,
      accountBookList: [],
      accountBookUserUrls: [],
      total_amount: 0,
      average_amount: 0,
      category_chart: [],
      date_chart: [],
      IconDatas: []
    };
  },
  onShow: function() {
    let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
    if (!common_vendor.index.getStorageSync("token")) {
      common_vendor.index.switchTab({
        url: `/pages/my/index`
      });
      return;
    }
    getApp().iconInfoData().then(() => {
      getApp().userInfoData().then((rea) => {
        getApp().accountBookData(0).then((res) => {
          this.IconDatas = getApp().globalData.iconData;
          const accounts = getApp().globalData.accountBookList;
          const activeAccounts = getApp().globalData.activeAccountBookList;
          const users = getApp().globalData.userList;
          this.userList = users;
          this.accountBookList = accounts.map((item) => {
            return {
              ...item,
              label: item.name,
              value: item.id
            };
          });
          if (activeAccounts) {
            this.account_book_id = activeAccounts.id;
            this.accountBookName = activeAccounts.name;
            this.accountBookUserUrls = activeAccounts.user_ids.map(
              (item) => {
                var _a;
                return ((_a = users.find((items) => items.id == item)) == null ? void 0 : _a.icon_url) || (userInfo == null ? void 0 : userInfo.icon_url);
              }
            );
            this.getServerAPI();
          } else {
            this.account_book_id = accounts[0].id;
            this.accountBookName = accounts[0].name;
            this.accountBookUserUrls = accounts[0].user_ids.map(
              (item) => {
                var _a;
                return ((_a = users.find((items) => items.id == item)) == null ? void 0 : _a.icon_url) || (userInfo == null ? void 0 : userInfo.icon_url);
              }
            );
            this.getServerAPI();
          }
          getApp().globalData.activeAccountBookList = null;
        }).catch((err) => {
        });
      });
    });
  },
  onReady() {
  },
  methods: {
    tabChange(type) {
      this.payType = type;
      this.opts.color = type == 1 ? ["#fef614"] : ["#55c9c9"];
      this.getServerAPI();
    },
    getServerAPI() {
      let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
      common_vendor.index.request({
        url: `${this.$baseURL}/api/v1/chart?account_book_id=${this.account_book_id}&type=${this.payType}&user_id=${userInfo.id}`,
        method: "GET",
        success: (res) => {
          var _a, _b, _c, _d;
          this.total_amount = res.data.total_amount;
          this.average_amount = res.data.average_amount;
          if ((_b = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.category_chart) == null ? void 0 : _b.length) {
            res.data.category_chart.forEach((item) => {
              let icon = this.IconDatas.find(
                (tem) => tem.id == item.category_id
              );
              common_vendor.index.__f__("log", "at pages/chart/index.vue:222", icon);
              item.icon_url = icon ? icon.icon_url : "";
              item.iconName = icon ? icon.name : "";
              item.newPercent = item.percent ? Number(Number(item.percent * 100).toFixed(3)) : 0;
            });
            common_vendor.index.__f__("log", "at pages/chart/index.vue:230", res.data.category_chart);
            this.category_chart = res.data.category_chart;
          }
          if ((_d = (_c = res == null ? void 0 : res.data) == null ? void 0 : _c.date_chart) == null ? void 0 : _d.length) {
            this.date_chart = res.data.date_chart;
          }
          this.getServerData();
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/chart/index.vue:240", err, "---err");
        }
      });
    },
    accountChange(item) {
      var _a;
      let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
      this.account_book_id = item;
      let data = this.accountBookList.find((items) => items.id == item);
      this.accountBookName = data.label;
      if ((_a = getApp().globalData.userList) == null ? void 0 : _a.length) {
        this.accountBookUserUrls = data.user_ids.map(
          (tem) => {
            var _a2, _b;
            return ((_a2 = this.userList) == null ? void 0 : _a2.length) ? ((_b = this.userList.find((items) => items.id == tem)) == null ? void 0 : _b.icon_url) || (userInfo == null ? void 0 : userInfo.icon_url) : userInfo == null ? void 0 : userInfo.icon_url;
          }
        );
        this.getServerAPI();
      } else {
        getApp().userInfoData().then((res) => {
          this.userList = getApp().globalData.userList;
          this.accountBookUserUrls = data.user_ids.map(
            (tem) => {
              var _a2, _b;
              return ((_a2 = this.userList) == null ? void 0 : _a2.length) ? ((_b = this.userList.find((items) => items.id == tem)) == null ? void 0 : _b.icon_url) || (userInfo == null ? void 0 : userInfo.icon_url) : userInfo == null ? void 0 : userInfo.icon_url;
            }
          );
          this.getServerAPI();
        }).catch((err) => {
          this.userList = [];
        });
      }
    },
    getServerData() {
      setTimeout(() => {
        let res = {
          categories: this.date_chart.map(
            (item) => new Date(item.date_str).getDate()
          ),
          series: [
            {
              name: this.payType == 1 ? "收入" : "支出",
              data: this.date_chart.map((item) => ({
                value: item.amount,
                transactions: item.transactions
              }))
            }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    }
  }
};
if (!Array) {
  const _easycom_up_dropdown_item2 = common_vendor.resolveComponent("up-dropdown-item");
  const _easycom_up_dropdown2 = common_vendor.resolveComponent("up-dropdown");
  const _easycom_up_avatar_group2 = common_vendor.resolveComponent("up-avatar-group");
  const _component_QiunDataCharts = common_vendor.resolveComponent("QiunDataCharts");
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_line_progress2 = common_vendor.resolveComponent("up-line-progress");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_easycom_up_dropdown_item2 + _easycom_up_dropdown2 + _easycom_up_avatar_group2 + _component_QiunDataCharts + _easycom_up_avatar2 + _easycom_up_line_progress2 + _component_CustomTabbar)();
}
const _easycom_up_dropdown_item = () => "../../uni_modules/uview-plus/components/u-dropdown-item/u-dropdown-item.js";
const _easycom_up_dropdown = () => "../../uni_modules/uview-plus/components/u-dropdown/u-dropdown.js";
const _easycom_up_avatar_group = () => "../../uni_modules/uview-plus/components/u-avatar-group/u-avatar-group.js";
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_line_progress = () => "../../uni_modules/uview-plus/components/u-line-progress/u-line-progress.js";
if (!Math) {
  (_easycom_up_dropdown_item + _easycom_up_dropdown + _easycom_up_avatar_group + _easycom_up_avatar + _easycom_up_line_progress)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.tabChange(2)),
    b: $data.payType == 2 ? 1 : "",
    c: common_vendor.o(($event) => $options.tabChange(1)),
    d: $data.payType == 1 ? 1 : "",
    e: `50px`,
    f: common_vendor.o($options.accountChange),
    g: common_vendor.o(($event) => $data.account_book_id = $event),
    h: common_vendor.p({
      title: $data.accountBookName,
      options: $data.accountBookList,
      modelValue: $data.account_book_id
    }),
    i: common_vendor.p({
      ["border-radius"]: "8"
    }),
    j: common_vendor.p({
      urls: $data.accountBookUserUrls,
      size: "30",
      gap: "0.4"
    }),
    k: common_vendor.t($data.payType == 1 ? "总收入" : "总支出"),
    l: common_vendor.t($data.total_amount),
    m: common_vendor.t($data.average_amount),
    n: common_vendor.p({
      type: "line",
      opts: $data.opts,
      chartData: $data.chartData
    }),
    o: common_vendor.t($data.payType == 1 ? "收入排行榜" : "支出排行榜"),
    p: common_vendor.f($data.category_chart, (item, index, i0) => {
      return {
        a: "6cea702a-4-" + i0,
        b: common_vendor.p({
          src: item.icon_url ? item.icon_url : _ctx.pic,
          size: "30"
        }),
        c: common_vendor.t(item.iconName),
        d: common_vendor.t(item.newPercent),
        e: common_vendor.t(item.amount),
        f: "6cea702a-5-" + i0,
        g: common_vendor.p({
          percentage: item.newPercent,
          activeColor: $data.payType == 1 ? "#fef614" : "#55c9c9"
        }),
        h: index
      };
    }),
    q: common_vendor.p({
      selected: 1
    }),
    r: common_vendor.gei(_ctx, "")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chart/index.js.map
