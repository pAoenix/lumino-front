"use strict";
const common_vendor = require("../../common/vendor.js");
const SvgIcon = () => "../component/svg-icon.js";
const CustomTabbar = () => "../component/custom-tabbar.js";
const _sfc_main = {
  components: {
    SvgIcon,
    CustomTabbar
  },
  data() {
    return {
      show: false,
      accountBookId: "",
      accountBookName: "",
      accountBook: null,
      accountBookList: [],
      accountBookUser: [],
      accountBookUserUrls: [],
      userList: [],
      accountList: [{
        id: 1,
        type: "0",
        amount: 399,
        text: "零食",
        icon: "icon-lingshi-fill",
        accountBook: {
          createAt: "2025-01-20 15:26:56",
          expensesAmount: 99.99,
          id: 1,
          incomeAmount: 5899.99,
          title: "默认账本",
          users: [1, 2, 3, 4, 5, 8]
        },
        accountBookId: 1,
        accountBookName: "默认账本",
        accountBookUser: [1, 2, 3, 4, 5, 8],
        accountBookUserUrls: [
          "/static/user/user1.png",
          "/static/user/user2.png",
          "/static/user/user3.png",
          "/static/user/user4.png",
          "/static/user/user5.png",
          "/static/user/user8.png"
        ],
        accountUser: [1, 2, 4, 5, 8],
        accountId: 3,
        accountName: "现金"
      }, {
        id: 2,
        type: "0",
        amount: 600.33,
        text: "宠物",
        icon: "icon-chongwu-fill",
        accountBook: {
          createAt: "2025-01-20 15:26:56",
          expensesAmount: 99.99,
          id: 1,
          incomeAmount: 5899.99,
          title: "默认账本",
          users: [1, 2, 3, 4, 5, 8]
        },
        accountBookId: 1,
        accountBookName: "默认账本",
        accountBookUser: [1, 2, 3, 4, 5, 8],
        accountBookUserUrls: [
          "/static/user/user1.png",
          "/static/user/user2.png",
          "/static/user/user3.png",
          "/static/user/user4.png",
          "/static/user/user5.png",
          "/static/user/user8.png"
        ],
        accountUser: [2, 5, 8],
        accountId: 3,
        accountName: "现金"
      }, {
        id: 3,
        type: "1",
        amount: 999.33,
        text: "机票",
        icon: "icon-jipiao-fill",
        accountBook: {
          createAt: "2025-01-20 15:26:56",
          expensesAmount: 99.99,
          id: 1,
          incomeAmount: 5899.99,
          title: "默认账本",
          users: [1, 2, 3, 4, 5, 8]
        },
        accountBookId: 1,
        accountBookName: "默认账本",
        accountBookUser: [1, 2, 3, 4, 5, 8],
        accountBookUserUrls: [
          "/static/user/user1.png",
          "/static/user/user2.png",
          "/static/user/user3.png",
          "/static/user/user4.png",
          "/static/user/user5.png",
          "/static/user/user8.png"
        ],
        accountUser: [3, 4, 8],
        accountId: 3,
        accountName: "现金"
      }],
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
      account_warpper: [
        {
          amount: 8888.88,
          amounts: 22.22,
          type: "账单支出（¥）",
          title: "今天杨宗易支出 ¥:33345.00 元"
        },
        {
          amount: 8888.88,
          amounts: 22.22,
          type: "账单收入（¥）",
          title: "今日杨宗易收入 ¥:33552.00 元"
        },
        {
          amount: 8888.88,
          amounts: 22.22,
          type: "账单转账（¥）",
          title: "今日杨宗易转账 ¥:33552.00 元"
        },
        {
          amount: 8888.88,
          amounts: 22.22,
          type: "账单预交款（¥）",
          title: "今日杨宗易预交款¥:33552.00 元"
        }
      ]
    };
  },
  computed: {},
  onShow: function() {
    const accounts = getApp().globalData.accountBookList;
    const activeAccounts = getApp().globalData.activeAccountBookList;
    const users = getApp().globalData.userList;
    this.userList = users;
    this.accountBookList = accounts.map((item) => {
      return {
        ...item,
        label: item.title,
        value: item.id
      };
    });
    if (activeAccounts) {
      this.accountBook = activeAccounts;
      this.accountBookId = activeAccounts.id;
      this.accountBookName = activeAccounts.title;
      this.accountBookUser = activeAccounts.users;
      this.accountBookUserUrls = activeAccounts.users.map((item) => users.find((items) => items.id == item).img);
    } else {
      this.accountBook = accounts[0];
      this.accountBookId = accounts[0].id;
      this.accountBookName = accounts[0].title;
      this.accountBookUser = accounts[0].users;
      this.accountBookUserUrls = accounts[0].users.map((item) => users.find((items) => items.id == item).img);
    }
    const data = getApp().globalData.selectBillData;
    if (data) {
      if (data.update) {
        let index = this.accountList.findIndex((item) => item.id == data.id);
        this.accountList[index] = data;
      } else {
        this.accountList.unshift({
          ...data,
          id: (/* @__PURE__ */ new Date()).getTime()
        });
      }
    }
    getApp().globalData.selectBillData = null;
  },
  methods: {
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
      this.accountBookId = item;
      let data = this.accountBookList.find((items) => items.id == item);
      this.accountBook = data;
      this.accountBookName = data.label;
      this.accountBookUser = data.users;
      this.accountBookUserUrls = data.users.map((tem) => this.userList.find((items) => items.id == tem).img);
    },
    conutClick(props, item, index) {
      if (props.index == 1) {
        this.accountList.splice(index, 1);
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
  const _component_SvgIcon = common_vendor.resolveComponent("SvgIcon");
  const _easycom_up_swipe_action_item2 = common_vendor.resolveComponent("up-swipe-action-item");
  const _easycom_up_swipe_action2 = common_vendor.resolveComponent("up-swipe-action");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_easycom_up_dropdown_item2 + _easycom_up_dropdown2 + _easycom_up_avatar_group2 + _component_SvgIcon + _easycom_up_swipe_action_item2 + _easycom_up_swipe_action2 + _component_CustomTabbar)();
}
const _easycom_up_dropdown_item = () => "../../uni_modules/uview-plus/components/u-dropdown-item/u-dropdown-item.js";
const _easycom_up_dropdown = () => "../../uni_modules/uview-plus/components/u-dropdown/u-dropdown.js";
const _easycom_up_avatar_group = () => "../../uni_modules/uview-plus/components/u-avatar-group/u-avatar-group.js";
const _easycom_up_swipe_action_item = () => "../../uni_modules/uview-plus/components/u-swipe-action-item/u-swipe-action-item.js";
const _easycom_up_swipe_action = () => "../../uni_modules/uview-plus/components/u-swipe-action/u-swipe-action.js";
if (!Math) {
  (_easycom_up_dropdown_item + _easycom_up_dropdown + _easycom_up_avatar_group + _easycom_up_swipe_action_item + _easycom_up_swipe_action)();
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
        d: common_vendor.t(item.title),
        e: index
      };
    }),
    g: common_vendor.f($data.accountList, (item, index, i0) => {
      return {
        a: "2a0f1042-5-" + i0 + "," + ("2a0f1042-4-" + i0),
        b: common_vendor.p({
          width: "40px",
          height: "40px",
          name: `${item.icon}-hover`
        }),
        c: common_vendor.t(["支出", "收入", "转账", "预交款"][item.type]),
        d: common_vendor.t(item.text),
        e: common_vendor.t(["支出", "收入", "转账", "预交款"][item.type]),
        f: common_vendor.t(Number(item.amount).toFixed(2)),
        g: common_vendor.o((props) => $options.conutClick(props, item, index), index),
        h: index,
        i: "2a0f1042-4-" + i0 + ",2a0f1042-3"
      };
    }),
    h: common_vendor.p({
      options: $data.options
    }),
    i: common_vendor.o($options.tabberChange),
    j: common_vendor.p({
      selected: 2
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
