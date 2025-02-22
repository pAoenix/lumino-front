"use strict";
const common_vendor = require("../../common/vendor.js");
const SvgIcon = () => "../component/svg-icon.js";
const _sfc_main = {
  data() {
    return {
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
      accountUserUrls: []
    };
  },
  components: {
    SvgIcon
  },
  onShow: function() {
    const IconData = getApp().globalData.iconArray;
    this.iconData = IconData;
    const data = getApp().globalData.billCount;
    common_vendor.index.__f__("log", "at pages/account/add-bill.vue:77", data, "----billCount");
    if (data.icon) {
      this.iconActive = data.icon;
    }
    if (data.text) {
      this.textActive = data.text;
    }
    if (data.accountId) {
      this.selectAccountId = data.accountId;
    }
    if (data.accountName) {
      this.selectAccountName = data.accountName;
    }
    this.billData = data;
    getApp().globalData.accountBookList;
    const accountType = getApp().globalData.accountType;
    common_vendor.index.__f__("log", "at pages/account/add-bill.vue:95", accountType);
    this.accountTypeOptions = [accountType];
    if (!data.accountId) {
      this.selectAccountId = accountType[0].id;
      this.selectAccountName = accountType[0].label;
    }
    getApp().globalData.userList;
    this.accountUser = [data.accountBookUser[0]];
    this.accountUserUrls = [data.accountBookUserUrls[0]];
    const updata = getApp().globalData.updateAcconutData;
    if (updata) {
      this.iconActive = updata.icon;
      this.textActive = updata.text;
      this.selectAccountId = updata.accountId;
      this.selectAccountName = updata.accountName;
      this.billData = updata;
    }
    common_vendor.index.__f__("log", "at pages/account/add-bill.vue:114", updata, "----updateAcconutData");
    this.billUpdateData = updata;
    const selectUserList = getApp().globalData.selectUserList;
    common_vendor.index.__f__("log", "at pages/account/add-bill.vue:118", selectUserList);
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
        icon: item.icon,
        text: item.text
      };
      this.iconActive = item.icon;
      this.textActive = item.text;
      if (!updata)
        return;
      getApp().globalData.updateAcconutData = {
        ...updata,
        icon: item.icon,
        text: item.text
      };
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
      getApp().globalData.selectBillData = {
        ...this.billData,
        accountId: this.selectAccountId,
        accountName: this.selectAccountName,
        icon: this.iconActive,
        text: this.textActive,
        accountUser: this.accountUser,
        update: this.billUpdateData ? 1 : 0
      };
      getApp().globalData.billCount = null;
      getApp().globalData.updateAcconutData = null;
      common_vendor.index.switchTab({
        url: `/pages/index/index`
      });
    }
  }
};
if (!Array) {
  const _easycom_up_picker2 = common_vendor.resolveComponent("up-picker");
  const _easycom_up_avatar_group2 = common_vendor.resolveComponent("up-avatar-group");
  const _component_SvgIcon = common_vendor.resolveComponent("SvgIcon");
  (_easycom_up_picker2 + _easycom_up_avatar_group2 + _component_SvgIcon)();
}
const _easycom_up_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
const _easycom_up_avatar_group = () => "../../uni_modules/uview-plus/components/u-avatar-group/u-avatar-group.js";
if (!Math) {
  (_easycom_up_picker + _easycom_up_avatar_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.billData
  }, $data.billData ? {
    b: common_vendor.t(["支出", "收入", "转账", "预交款"][$data.billData.type]),
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
    m: common_vendor.f($data.iconData, (item, index, i0) => {
      return {
        a: "e990ce43-2-" + i0,
        b: common_vendor.p({
          width: "50px",
          height: "50px",
          name: $data.iconActive == item.icon ? `${item.icon}-hover` : item.icon
        }),
        c: common_vendor.t(item.text),
        d: common_vendor.o(($event) => $options.iconSecelt(item), index),
        e: $data.iconActive == item.icon ? 1 : "",
        f: index
      };
    }),
    n: common_vendor.o(($event) => $options.submit())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e990ce43"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/add-bill.js.map
