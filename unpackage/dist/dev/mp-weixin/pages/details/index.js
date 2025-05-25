"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_settingTime = require("../../utils/setting-time.js");
const common_assets = require("../../common/assets.js");
const CustomTabbar = () => "../component/custom-tabbar.js";
const _sfc_main = {
  components: {
    CustomTabbar
  },
  data() {
    return {
      userList: [],
      tagActive: 1,
      accountList: [],
      radios: [
        {
          checked: true,
          text: "热度"
        },
        {
          checked: false,
          text: "时间"
        }
      ]
    };
  },
  onShow: async function() {
    if (!common_vendor.index.getStorageSync("token")) {
      common_vendor.index.switchTab({
        url: `/pages/my/index`
      });
      return;
    }
    getApp().iconInfoData();
    getApp().userInfoData().then((rea) => {
      common_vendor.index.__f__("log", "at pages/details/index.vue:104", rea);
      getApp().accountBookData(0).then((res) => {
        const accounts = getApp().globalData.accountBookList;
        const users = getApp().globalData.userList;
        this.userList = users;
        this.accountList = accounts;
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/details/index.vue:114", err);
        this.userList = [];
        this.accountList = [];
      });
    }).catch((err) => {
      common_vendor.index.__f__("log", "at pages/details/index.vue:119", err);
    });
  },
  onLoad() {
  },
  mounted() {
  },
  methods: {
    setTime(time) {
      if (time) {
        return utils_settingTime.formatDate(time);
      } else {
        return "";
      }
    },
    getImg(id) {
      var _a;
      let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
      if ((_a = this.userList) == null ? void 0 : _a.length) {
        let data = this.userList.find((item) => item.id == id);
        if (data) {
          return data.icon_url;
        } else {
          return (userInfo == null ? void 0 : userInfo.icon_url) || "";
        }
      } else {
        return (userInfo == null ? void 0 : userInfo.icon_url) || "";
      }
    },
    getUserImg(item) {
      var _a;
      if ((_a = item.user_ids) == null ? void 0 : _a.length) {
        return item.user_ids.map((items) => this.getImg(items));
      } else {
        return [];
      }
    },
    radioClick(name) {
      this.radios.forEach((item, index) => {
        item.checked = index === name;
      });
    },
    toAccountPage(item) {
      getApp().globalData.activeAccountBookList = item;
      common_vendor.index.switchTab({
        url: `/pages/index/index`
      });
    },
    updateAccountBook(item) {
      getApp().globalData.updateAccountBook = item;
      common_vendor.index.navigateTo({
        url: "/pages/account/add-account-book"
      });
    },
    addAccountBook() {
      common_vendor.index.navigateTo({
        url: "/pages/account/add-account-book"
      });
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_sticky2 = common_vendor.resolveComponent("up-sticky");
  const _easycom_up_tag2 = common_vendor.resolveComponent("up-tag");
  const _easycom_up_avatar_group2 = common_vendor.resolveComponent("up-avatar-group");
  const _easycom_up_divider2 = common_vendor.resolveComponent("up-divider");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_easycom_up_icon2 + _easycom_up_sticky2 + _easycom_up_tag2 + _easycom_up_avatar_group2 + _easycom_up_divider2 + _component_CustomTabbar)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_sticky = () => "../../uni_modules/uview-plus/components/u-sticky/u-sticky.js";
const _easycom_up_tag = () => "../../uni_modules/uview-plus/components/u-tag/u-tag.js";
const _easycom_up_avatar_group = () => "../../uni_modules/uview-plus/components/u-avatar-group/u-avatar-group.js";
const _easycom_up_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_sticky + _easycom_up_tag + _easycom_up_avatar_group + _easycom_up_divider)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      name: "plus-circle-fill",
      color: "#55c9c9",
      size: "20px"
    }),
    b: common_vendor.o(($event) => $options.addAccountBook()),
    c: common_vendor.p({
      ["offset-top"]: "10"
    }),
    d: common_vendor.f($data.radios, (item, index, i0) => {
      return {
        a: item.checked ? 1 : "",
        b: common_vendor.o(($event) => $options.radioClick(index), index),
        c: "0bb53e62-2-" + i0,
        d: common_vendor.p({
          text: item.text,
          plain: !item.checked,
          shape: "circle",
          name: index,
          icon: !item.checked ? "/static/sort.png" : "/static/sort-active.png"
        }),
        e: index
      };
    }),
    e: common_assets._imports_0,
    f: common_vendor.f($data.accountList, (item, index, i0) => {
      return {
        a: common_vendor.t($options.setTime(item.created_at)),
        b: common_vendor.t(item.name),
        c: "0bb53e62-3-" + i0,
        d: common_vendor.o(($event) => $options.toAccountPage(item), index),
        e: "0bb53e62-4-" + i0,
        f: common_vendor.p({
          maxCount: 7,
          urls: $options.getUserImg(item),
          size: "40",
          gap: "0"
        }),
        g: "0bb53e62-5-" + i0,
        h: "0bb53e62-6-" + i0,
        i: common_vendor.o(($event) => $options.updateAccountBook(item), index),
        j: "0bb53e62-7-" + i0,
        k: "0bb53e62-8-" + i0,
        l: common_vendor.t(item.income),
        m: common_vendor.t(item.spending),
        n: index
      };
    }),
    g: common_vendor.p({
      name: "arrow-right"
    }),
    h: common_vendor.p({
      dot: true
    }),
    i: common_vendor.p({
      name: "setting",
      color: "#55c9c9"
    }),
    j: common_vendor.p({
      name: "grid",
      color: "#55c9c9"
    }),
    k: common_vendor.p({
      dot: false
    }),
    l: common_vendor.p({
      selected: 0
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/details/index.js.map
