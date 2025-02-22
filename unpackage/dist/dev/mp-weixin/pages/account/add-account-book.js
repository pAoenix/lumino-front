"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      accountBookName: "",
      userList: "",
      activeUser: [],
      updateData: null
    };
  },
  onShow: function() {
    const users = getApp().globalData.userList;
    this.userList = users;
    const updateData = getApp().globalData.updateAccountBook;
    common_vendor.index.__f__("log", "at pages/account/add-account-book.vue:41", updateData);
    this.updateData = updateData;
    if (updateData) {
      this.accountBookName = updateData.title;
      this.activeUser = updateData.users;
    }
    getApp().globalData.updateAccountBook = null;
  },
  methods: {
    checkboxChange(data) {
      common_vendor.index.__f__("log", "at pages/account/add-account-book.vue:51", data);
    },
    submit() {
      const accounts = getApp().globalData.accountBookList;
      let newData = {
        id: this.updateData ? this.updateData.id : (/* @__PURE__ */ new Date()).getTime(),
        title: this.accountBookName,
        createAt: this.updateData ? this.updateData.createAt : (/* @__PURE__ */ new Date()).getTime(),
        incomeAmount: this.updateData ? this.updateData.incomeAmount : 0,
        expensesAmount: this.updateData ? this.updateData.expensesAmount : 0,
        users: this.activeUser
      };
      if (this.updateData) {
        let index = accounts.findIndex((item) => item.id == this.updateData.id);
        let newAccounts = JSON.parse(JSON.stringify(accounts));
        if (index !== -1) {
          newAccounts[index] = newData;
        }
        getApp().globalData.accountBookList = newAccounts;
      } else {
        let newAccounts = accounts.concat([newData]);
        getApp().globalData.accountBookList = newAccounts;
      }
      common_vendor.index.switchTab({
        url: `/pages/details/index`
      });
    }
  }
};
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_cell2 = common_vendor.resolveComponent("up-cell");
  const _easycom_up_checkbox2 = common_vendor.resolveComponent("up-checkbox");
  const _easycom_up_checkbox_group2 = common_vendor.resolveComponent("up-checkbox-group");
  const _easycom_up_cell_group2 = common_vendor.resolveComponent("up-cell-group");
  (_easycom_up_input2 + _easycom_up_cell2 + _easycom_up_checkbox2 + _easycom_up_checkbox_group2 + _easycom_up_cell_group2)();
}
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_checkbox = () => "../../uni_modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_up_checkbox_group = () => "../../uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
const _easycom_up_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_up_input + _easycom_up_cell + _easycom_up_checkbox + _easycom_up_checkbox_group + _easycom_up_cell_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.accountBookName = $event),
    b: common_vendor.p({
      placeholder: "请输入内容",
      clearable: true,
      border: "surround",
      modelValue: $data.accountBookName
    }),
    c: common_vendor.p({
      title: "账本名称"
    }),
    d: common_vendor.f($data.userList, (item, index, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.name),
        c: index,
        d: "5a0be122-4-" + i0 + ",5a0be122-3",
        e: common_vendor.p({
          shape: "circle",
          activeColor: "#55c9c9",
          label: item.name,
          name: item.id
        })
      };
    }),
    e: common_vendor.o($options.checkboxChange),
    f: common_vendor.o(($event) => $data.activeUser = $event),
    g: common_vendor.p({
      placement: "column",
      modelValue: $data.activeUser
    }),
    h: common_vendor.o(($event) => $options.submit())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5a0be122"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/add-account-book.js.map
