"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_settingTime = require("../../utils/setting-time.js");
const SvgIcon = () => "../component/svg-icon.js";
const _sfc_main = {
  data() {
    return {
      pic: "/static/logo.png",
      billData: null,
      billUpdateData: null,
      iconData: [],
      iconActive: "",
      textActive: "",
      show: false,
      accountBookOptions: [],
      selectAccountId: "1",
      selectAccountName: "现金",
      accountTypeOptions: [],
      accountUser: [],
      accountUserUrls: [],
      description: ""
    };
  },
  components: {
    SvgIcon
  },
  onShow: function() {
    const IconData = getApp().globalData.iconData;
    this.iconData = IconData;
    const data = getApp().globalData.billCount;
    if (data == null ? void 0 : data.iconId) {
      this.iconActive = data.iconId;
    }
    if (data == null ? void 0 : data.text) {
      this.textActive = data.text;
    }
    if (data == null ? void 0 : data.accountId) {
      this.selectAccountId = data.accountId;
    }
    if (data == null ? void 0 : data.accountName) {
      this.selectAccountName = data.accountName;
    }
    this.billData = data;
    getApp().globalData.accountBookList;
    const accountType = getApp().globalData.accountType;
    this.accountTypeOptions = [accountType];
    if (!data.accountId) {
      this.selectAccountId = accountType[0].id;
      this.selectAccountName = accountType[0].label;
    }
    getApp().globalData.userList;
    let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
    this.accountUser = [userInfo.id];
    this.accountUserUrls = [userInfo.icon_url];
    const updata = getApp().globalData.updateAcconutData;
    if (updata) {
      this.iconActive = updata.iconId;
      this.textActive = updata.text;
      this.selectAccountId = updata.accountId;
      this.selectAccountName = updata.accountName;
      this.billData = updata;
    }
    this.billUpdateData = updata;
    const selectUserList = getApp().globalData.selectUserList;
    if (selectUserList) {
      this.accountUser = selectUserList.accountUser;
      this.accountUserUrls = selectUserList.accountUserUrls;
    }
  },
  methods: {
    iconSecelt(item) {
      const data = getApp().globalData.billCount;
      const updata = getApp().globalData.updateAcconutData;
      getApp().globalData.billCount = {
        ...data,
        iconId: item.id,
        text: item.name
      };
      this.iconActive = item.id;
      this.textActive = item.name;
      if (!updata)
        return;
      getApp().globalData.updateAcconutData = {
        ...updata,
        iconId: item.id,
        text: item.name
      };
    },
    addIcons() {
      getApp().globalData.icons = 1;
      common_vendor.index.navigateTo({
        url: "/pages/my/icons"
      });
    },
    confirmAcconut(item) {
      const data = getApp().globalData.billCount;
      const updata = getApp().globalData.updateAcconutData;
      getApp().globalData.billCount = {
        ...data,
        accountId: item.value[0].id,
        accountName: item.value[0].label
      };
      this.selectAccountId = item.value[0].id;
      this.selectAccountName = item.value[0].label;
      this.show = false;
      if (!updata)
        return;
      getApp().globalData.updateAcconutData = {
        ...updata,
        accountId: item.value[0].id,
        accountName: item.value[0].label
      };
    },
    close() {
      this.show = false;
    },
    selectParticipants() {
      getApp().globalData.participantsData = {
        ...this.billData,
        accountUser: this.accountUser
      };
      common_vendor.index.navigateTo({
        url: `/pages/account/participants`
      });
    },
    submit() {
      let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
      let data = {
        id: this.billUpdateData ? this.billUpdateData.id : void 0,
        amount: Number(this.billData.amount),
        account_book_id: Number(this.billData.accountBookId),
        category_id: this.iconActive,
        date: utils_settingTime.formatDateT(/* @__PURE__ */ new Date()),
        creator_id: userInfo.id,
        pay_user_id: userInfo.id,
        related_user_ids: this.accountUser,
        type: this.billData.type,
        description: this.description
      };
      common_vendor.index.request({
        url: `${this.$baseURL}/api/v1/transaction`,
        method: this.billUpdateData ? "PUT" : "POST",
        data,
        success: (res) => {
          var _a, _b, _c, _d;
          if (((_a = res.data) == null ? void 0 : _a.message) && ((_b = res.data) == null ? void 0 : _b.message)) {
            common_vendor.index.showToast({
              title: ((_c = res.data) == null ? void 0 : _c.message) ? (_d = res.data) == null ? void 0 : _d.message : this.billUpdateData ? "修改交易失败" : "创建交易失败",
              icon: "none"
            });
          } else {
            common_vendor.index.showToast({
              title: this.billUpdateData ? "修改交易成功" : "创建交易成功"
            });
            getApp().globalData.billCount = null;
            getApp().globalData.updateAcconutData = null;
            common_vendor.index.switchTab({
              url: `/pages/index/index`
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/account/add-bill.vue:260", err);
          common_vendor.index.showToast({
            title: this.billUpdateData ? "修改交易失败" : "创建交易失败",
            icon: "none"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_up_picker2 = common_vendor.resolveComponent("up-picker");
  const _easycom_up_avatar_group2 = common_vendor.resolveComponent("up-avatar-group");
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_up_picker2 + _easycom_up_avatar_group2 + _easycom_up_textarea2 + _easycom_up_avatar2 + _easycom_up_icon2)();
}
const _easycom_up_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
const _easycom_up_avatar_group = () => "../../uni_modules/uview-plus/components/u-avatar-group/u-avatar-group.js";
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_picker + _easycom_up_avatar_group + _easycom_up_textarea + _easycom_up_avatar + _easycom_up_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.billData
  }, $data.billData ? {
    b: common_vendor.t(["", "收入", "支出", "转账", "预交款"][$data.billData.type]),
    c: common_vendor.t(Number($data.billData.amount).toFixed(2))
  } : {}, {
    d: common_vendor.t($data.selectAccountName),
    e: common_vendor.o(($event) => $data.show = true),
    f: common_vendor.o($options.confirmAcconut),
    g: common_vendor.o($options.close),
    h: common_vendor.o($options.close),
    i: common_vendor.p({
      closeOnClickOverlay: true,
      show: $data.show,
      columns: $data.accountTypeOptions,
      keyName: "label"
    }),
    j: common_vendor.t($data.accountUserUrls.length),
    k: common_vendor.p({
      urls: $data.accountUserUrls,
      size: "35",
      gap: "0.4"
    }),
    l: common_vendor.o((...args) => $options.selectParticipants && $options.selectParticipants(...args)),
    m: common_vendor.o(($event) => $data.description = $event),
    n: common_vendor.p({
      autoHeight: true,
      placeholder: "请输入内容",
      modelValue: $data.description
    }),
    o: common_vendor.f($data.iconData, (item, index, i0) => {
      return {
        a: "e990ce43-3-" + i0,
        b: common_vendor.p({
          src: item.icon_url ? item.icon_url : $data.pic,
          size: "50"
        }),
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => $options.iconSecelt(item), index),
        e: $data.iconActive == item.id ? 1 : "",
        f: index
      };
    }),
    p: common_vendor.p({
      name: "plus-circle",
      color: "#55c9c9",
      size: "28"
    }),
    q: common_vendor.o(($event) => $options.addIcons()),
    r: common_vendor.o(($event) => $options.submit()),
    s: common_vendor.gei(_ctx, "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e990ce43"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/add-bill.js.map
