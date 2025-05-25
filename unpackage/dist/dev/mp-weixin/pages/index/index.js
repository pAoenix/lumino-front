"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const SvgIcon = () => "../component/svg-icon.js";
const CustomTabbar = () => "../component/custom-tabbar.js";
const _sfc_main = {
  components: {
    SvgIcon,
    CustomTabbar
  },
  data() {
    return {
      pic: "/static/logo.png",
      show: false,
      accountBookId: "",
      accountBookName: "",
      accountBook: null,
      accountBookList: [],
      accountBookUser: [],
      accountBookUserUrls: [],
      userList: [],
      accountList: [],
      options: [
        {
          text: "编辑",
          style: {
            backgroundColor: "#3c9cff"
          }
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#f56c6c"
          }
        }
      ],
      account_warpper: []
    };
  },
  onLoad() {
  },
  onShow: function() {
    let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
    if (!common_vendor.index.getStorageSync("token")) {
      common_vendor.index.switchTab({
        url: `/pages/my/index`
      });
      return;
    }
    getApp().iconInfoData();
    getApp().userInfoData().then((rea) => {
      getApp().accountBookData(0).then((res) => {
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
          this.accountBook = activeAccounts;
          this.accountBookId = activeAccounts.id;
          this.accountBookName = activeAccounts.name;
          this.accountBookUser = activeAccounts.user_ids;
          this.accountBookUserUrls = activeAccounts.user_ids.map(
            (item) => {
              var _a;
              return ((_a = users.find((items) => items.id == item)) == null ? void 0 : _a.icon_url) || (userInfo == null ? void 0 : userInfo.icon_url);
            }
          );
        } else {
          this.accountBook = accounts[0];
          this.accountBookId = accounts[0].id;
          this.accountBookName = accounts[0].name;
          this.accountBookUser = accounts[0].user_ids;
          this.accountBookUserUrls = accounts[0].user_ids.map(
            (item) => {
              var _a;
              return ((_a = users.find((items) => items.id == item)) == null ? void 0 : _a.icon_url) || (userInfo == null ? void 0 : userInfo.icon_url);
            }
          );
        }
        this.getTransactionData();
      }).catch((err) => {
      });
    });
  },
  methods: {
    getTransactionData() {
      let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
      common_vendor.index.request({
        url: `${this.$baseURL}/api/v1/transaction?account_book_id=${this.accountBookId}&user_id=${userInfo.id}`,
        method: "GET",
        success: (res) => {
          var _a, _b, _c, _d, _e, _f;
          let newData = [];
          if ((_b = (_a = res.data) == null ? void 0 : _a.transactions) == null ? void 0 : _b.length) {
            (_c = res.data) == null ? void 0 : _c.transactions.forEach((item) => {
              var _a2;
              if ((_a2 = item.Items) == null ? void 0 : _a2.length) {
                item.Items.forEach((items) => {
                  let icon = res.data.categorys.find(
                    (tem) => tem.id == items.category_id
                  );
                  let userData = res.data.users.find(
                    (tem) => tem.id == items.pay_user_id
                  );
                  items.icon_url = icon ? icon.icon_url : "";
                  items.iconName = icon ? icon.name : "";
                  items.userName = userData ? userData.name : "";
                });
              }
            });
            let Spendings = (_d = res.data) == null ? void 0 : _d.transactions.reduce(
              (sum, item) => sum + item.Spending,
              0
            );
            let Incomes = (_e = res.data) == null ? void 0 : _e.transactions.reduce(
              (sum, item) => sum + item.Income,
              0
            );
            newData.push({
              amount: Number(Number(Spendings).toFixed(2)),
              amounts: userInfo.balance,
              type: "账单支出（¥）",
              name: `总支出 ¥:${Number(Number(Spendings).toFixed(2))} 元`
            }, {
              amount: Number(Number(Incomes).toFixed(2)),
              amounts: userInfo.balance,
              type: "账单收入（¥）",
              name: `总收入 ¥:${Number(Number(Incomes).toFixed(2))} 元`
            });
            this.account_warpper = newData;
            this.accountList = (_f = res.data) == null ? void 0 : _f.transactions;
          } else {
            this.account_warpper = [];
            this.accountList = [];
          }
        },
        fail: (err) => {
          this.accountList = [];
        }
      });
    },
    tabPage(url) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:228", url, "-----url");
      if (url !== "/pages/index/index") {
        this.accountBookId = "";
        this.accountBookName = "";
        this.account_warpper = [];
        this.accountList = [];
        this.accountBookUserUrls = [];
      }
    },
    tabberChange() {
      getApp().globalData.accountBookData = {
        accountBook: this.accountBook,
        accountBookId: this.accountBookId,
        accountBookName: this.accountBookName,
        accountBookUser: this.accountBookUser,
        accountBookUserUrls: this.accountBookUserUrls
      };
      common_vendor.index.navigateTo({
        url: "/pages/account/add-count"
      });
    },
    accountChange(item) {
      var _a;
      let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
      this.accountBookId = item;
      let data = this.accountBookList.find((items) => items.id == item);
      this.accountBook = data;
      this.accountBookName = data.label;
      this.accountBookUser = data.user_ids;
      if ((_a = getApp().globalData.userList) == null ? void 0 : _a.length) {
        this.accountBookUserUrls = data.user_ids.map(
          (tem) => {
            var _a2, _b;
            return ((_a2 = this.userList) == null ? void 0 : _a2.length) ? ((_b = this.userList.find((items) => items.id == tem)) == null ? void 0 : _b.icon_url) || (userInfo == null ? void 0 : userInfo.icon_url) : userInfo == null ? void 0 : userInfo.icon_url;
          }
        );
        this.getTransactionData();
      } else {
        getApp().userInfoData().then((res) => {
          this.userList = getApp().globalData.userList;
          this.accountBookUserUrls = data.user_ids.map(
            (tem) => {
              var _a2, _b;
              return ((_a2 = this.userList) == null ? void 0 : _a2.length) ? ((_b = this.userList.find((items) => items.id == tem)) == null ? void 0 : _b.icon_url) || (userInfo == null ? void 0 : userInfo.icon_url) : userInfo == null ? void 0 : userInfo.icon_url;
            }
          );
          this.getTransactionData();
        }).catch((err) => {
          this.userList = [];
        });
      }
    },
    conutClick(props, item, index) {
      if (props.index == 1) {
        common_vendor.index.request({
          url: `${this.$baseURL}/api/v1/transaction`,
          method: "DELETE",
          data: {
            id: item.id
          },
          success: (res) => {
            var _a, _b, _c, _d;
            if (((_a = res.data) == null ? void 0 : _a.message) && ((_b = res.data) == null ? void 0 : _b.message)) {
              common_vendor.index.showToast({
                title: ((_c = res.data) == null ? void 0 : _c.message) ? (_d = res.data) == null ? void 0 : _d.message : "删除失败",
                icon: "none"
              });
            } else {
              common_vendor.index.showToast({
                title: "删除成功"
              });
              this.getTransactionData();
            }
          },
          fail: (err) => {
            common_vendor.index.__f__("log", "at pages/index/index.vue:308", err);
            common_vendor.index.showToast({
              title: "删除失败",
              icon: "none"
            });
          }
        });
      } else {
        getApp().globalData.updateAcconutData = {
          ...item,
          accountBook: this.accountBook,
          accountBookId: this.accountBookId,
          accountBookName: this.accountBookName,
          accountBookUser: this.accountBookUser,
          accountBookUserUrls: this.accountBookUserUrls
        };
        getApp().globalData.billCount = {
          ...item,
          amount: item.amount,
          type: item.type,
          accountBook: this.accountBook,
          accountBookId: this.accountBookId,
          accountBookName: this.accountBookName,
          accountBookUser: this.accountBookUser,
          accountBookUserUrls: this.accountBookUserUrls
        };
        common_vendor.index.navigateTo({
          url: `/pages/account/add-bill`
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_up_dropdown_item2 = common_vendor.resolveComponent("up-dropdown-item");
  const _easycom_up_dropdown2 = common_vendor.resolveComponent("up-dropdown");
  const _easycom_up_avatar_group2 = common_vendor.resolveComponent("up-avatar-group");
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_swipe_action_item2 = common_vendor.resolveComponent("up-swipe-action-item");
  const _easycom_up_swipe_action2 = common_vendor.resolveComponent("up-swipe-action");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_easycom_up_dropdown_item2 + _easycom_up_dropdown2 + _easycom_up_avatar_group2 + _easycom_up_avatar2 + _easycom_up_swipe_action_item2 + _easycom_up_swipe_action2 + _component_CustomTabbar)();
}
const _easycom_up_dropdown_item = () => "../../uni_modules/uview-plus/components/u-dropdown-item/u-dropdown-item.js";
const _easycom_up_dropdown = () => "../../uni_modules/uview-plus/components/u-dropdown/u-dropdown.js";
const _easycom_up_avatar_group = () => "../../uni_modules/uview-plus/components/u-avatar-group/u-avatar-group.js";
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_swipe_action_item = () => "../../uni_modules/uview-plus/components/u-swipe-action-item/u-swipe-action-item.js";
const _easycom_up_swipe_action = () => "../../uni_modules/uview-plus/components/u-swipe-action/u-swipe-action.js";
if (!Math) {
  (_easycom_up_dropdown_item + _easycom_up_dropdown + _easycom_up_avatar_group + _easycom_up_avatar + _easycom_up_swipe_action_item + _easycom_up_swipe_action)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.accountChange),
    b: common_vendor.o(($event) => $data.accountBookId = $event),
    c: common_vendor.p({
      title: $data.accountBookName,
      options: $data.accountBookList,
      modelValue: $data.accountBookId
    }),
    d: common_vendor.p({
      ["border-radius"]: "8"
    }),
    e: common_vendor.p({
      urls: $data.accountBookUserUrls,
      size: "35",
      gap: "0.4"
    }),
    f: common_vendor.f($data.account_warpper, (item, index, i0) => {
      return {
        a: common_vendor.t(item.amount),
        b: common_vendor.t(item.type),
        c: common_vendor.t(item.amounts),
        d: common_vendor.t(item.name),
        e: index
      };
    }),
    g: common_vendor.f($data.accountList, (account, ind, i0) => {
      return {
        a: common_vendor.t(account.Date),
        b: common_vendor.t(account.Spending),
        c: common_vendor.t(account.Income),
        d: common_vendor.f(account.Items, (item, index, i1) => {
          return {
            a: "2a0f1042-5-" + i0 + "-" + i1 + "," + ("2a0f1042-4-" + i0 + "-" + i1),
            b: common_vendor.p({
              src: item.icon_url ? item.icon_url : $data.pic,
              size: "40"
            }),
            c: common_vendor.t(["", "收入", "支出", "转账", "预交款"][item.type]),
            d: common_vendor.t(item.iconName),
            e: common_vendor.t(item.userName),
            f: common_vendor.t(["", "收入", "支出", "转账", "预交款"][item.type]),
            g: common_vendor.t(Number(item.amount).toFixed(2)),
            h: common_vendor.o((props) => $options.conutClick(props, item, index), index),
            i: index,
            j: "2a0f1042-4-" + i0 + "-" + i1 + "," + ("2a0f1042-3-" + i0)
          };
        }),
        e: "2a0f1042-3-" + i0,
        f: ind
      };
    }),
    h: common_vendor.p({
      options: $data.options
    }),
    i: common_vendor.o($options.tabberChange),
    j: common_vendor.o($options.tabPage),
    k: common_vendor.p({
      selected: 2
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
