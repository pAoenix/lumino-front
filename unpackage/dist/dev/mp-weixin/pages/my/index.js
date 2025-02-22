"use strict";
const common_vendor = require("../../common/vendor.js");
const CustomTabbar = () => "../component/custom-tabbar.js";
const _sfc_main = {
  components: {
    CustomTabbar
  },
  data() {
    return {
      pic: "/static/logo.png",
      show: true
    };
  },
  onLoad() {
  },
  methods: {}
};
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_cell2 = common_vendor.resolveComponent("up-cell");
  const _easycom_up_cell_group2 = common_vendor.resolveComponent("up-cell-group");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_easycom_up_avatar2 + _easycom_up_icon2 + _easycom_up_cell2 + _easycom_up_cell_group2 + _component_CustomTabbar)();
}
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_up_avatar + _easycom_up_icon + _easycom_up_cell + _easycom_up_cell_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      src: $data.pic,
      size: "120"
    }),
    b: common_vendor.p({
      name: "scan",
      color: "#fff",
      size: "28"
    }),
    c: common_vendor.p({
      name: "arrow-right",
      color: "#fff",
      size: "28"
    }),
    d: common_vendor.p({
      icon: "rmb-circle",
      title: "支付"
    }),
    e: common_vendor.p({
      icon: "star",
      title: "家庭组"
    }),
    f: common_vendor.p({
      icon: "photo",
      title: "账单"
    }),
    g: common_vendor.p({
      icon: "coupon",
      title: "卡券"
    }),
    h: common_vendor.p({
      icon: "heart",
      title: "关注"
    }),
    i: common_vendor.p({
      icon: "setting",
      title: "设置"
    }),
    j: common_vendor.p({
      selected: 4
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/index.js.map
