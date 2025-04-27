"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      allChecked: [],
      accountUser: [],
      accountUserUrls: [],
      userShowList: [],
      userList: []
    };
  },
  onShow: function() {
    let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
    const users = getApp().globalData.userList;
    this.userList = users;
    const data = getApp().globalData.participantsData;
    common_vendor.index.__f__("log", "at pages/account/participants.vue:56", data, "-------<<<<<<<<<<");
    let newUsers = data.accountUser.some((item) => item.id == userInfo.id) ? data.accountUser.concat([userInfo]) : data.accountUser;
    this.accountUser = newUsers.map((item) => item);
    let newUsersSele = this.userList.concat([userInfo]);
    this.accountUserUrls = this.accountUser.map(
      (item) => {
        var _a;
        return ((_a = newUsersSele.find((items) => items.id == item)) == null ? void 0 : _a.icon_url) || "";
      }
    );
    this.userShowList = [];
    users.forEach((item) => {
      var _a;
      if (((_a = data.accountBookUser) == null ? void 0 : _a.length) && data.accountBookUser.some((items) => item.id == items)) {
        this.userShowList.push(item);
      }
    });
    this.userShowList.unshift(userInfo);
  },
  methods: {
    checkboxChange(data) {
      let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
      let newUsers = this.userList.concat([userInfo]);
      this.accountUserUrls = data.map(
        (item) => {
          var _a;
          return ((_a = newUsers.find((items) => items.id == item)) == null ? void 0 : _a.icon_url) || "";
        }
      );
    },
    allCheckedChange(data) {
      if (data) {
        let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
        let newUsers = this.userList.concat([userInfo]);
        this.accountUser = this.userShowList.map((item) => item.id);
        this.accountUserUrls = this.userShowList.map(
          (item) => {
            var _a;
            return ((_a = newUsers.find((items) => items.id == item.id)) == null ? void 0 : _a.icon_url) || "";
          }
        );
        common_vendor.index.__f__("log", "at pages/account/participants.vue:95", this.accountUserUrls);
      } else {
        this.accountUser = [];
        this.accountUserUrls = [];
      }
    },
    submit() {
      getApp().globalData.selectUserList = {
        accountUser: this.accountUser,
        accountUserUrls: this.accountUserUrls
      };
      common_vendor.index.navigateTo({
        url: `/pages/account/add-bill`
      });
    }
  }
};
if (!Array) {
  const _easycom_up_checkbox2 = common_vendor.resolveComponent("up-checkbox");
  const _easycom_up_checkbox_group2 = common_vendor.resolveComponent("up-checkbox-group");
  (_easycom_up_checkbox2 + _easycom_up_checkbox_group2)();
}
const _easycom_up_checkbox = () => "../../uni_modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_up_checkbox_group = () => "../../uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
if (!Math) {
  (_easycom_up_checkbox + _easycom_up_checkbox_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.allCheckedChange),
    b: common_vendor.o(($event) => $data.allChecked = $event),
    c: common_vendor.p({
      activeColor: "#55c9c9",
      shape: "circle",
      label: "全选",
      modelValue: $data.allChecked
    }),
    d: common_vendor.f($data.userShowList, (item, index, i0) => {
      return {
        a: item.icon_url,
        b: common_vendor.t(item.name),
        c: index,
        d: "46ee22e8-2-" + i0 + ",46ee22e8-1",
        e: common_vendor.p({
          shape: "circle",
          activeColor: "#55c9c9",
          label: item.name,
          name: item.id
        })
      };
    }),
    e: common_vendor.o($options.checkboxChange),
    f: common_vendor.o(($event) => $data.accountUser = $event),
    g: common_vendor.p({
      placement: "column",
      modelValue: $data.accountUser
    }),
    h: common_vendor.o(($event) => $options.submit())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-46ee22e8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/participants.js.map
