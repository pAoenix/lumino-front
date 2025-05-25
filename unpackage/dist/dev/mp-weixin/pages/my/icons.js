"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pic: "/static/logo.png",
      iconData: [],
      isIcon: null
    };
  },
  onShow: function() {
    this.isIcon = getApp().globalData.icons;
    getApp().iconInfoData().then((result) => {
      this.iconData = result;
    }).catch((err) => {
      this.iconData = [];
    });
  },
  methods: {
    submit() {
      common_vendor.index.navigateTo({
        url: "/pages/my/add-icon"
      });
    },
    close() {
      if (this.isIcon == 1) {
        common_vendor.index.navigateTo({
          url: `/pages/account/add-bill`
        });
      } else if (this.isIcon == 2) {
        common_vendor.index.navigateTo({
          url: `/pages/index/add-transaction`
        });
      } else {
        common_vendor.index.switchTab({
          url: `/pages/my/index`
        });
      }
      getApp().globalData.icons = null;
    }
  }
};
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  _easycom_up_avatar2();
}
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
if (!Math) {
  _easycom_up_avatar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.iconData, (item, index, i0) => {
      return {
        a: "6246b2dd-0-" + i0,
        b: common_vendor.p({
          src: item.icon_url ? item.icon_url : $data.pic,
          size: "50"
        }),
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => _ctx.iconSecelt(item), index),
        e: index
      };
    }),
    b: common_vendor.o(($event) => $options.close()),
    c: common_vendor.o(($event) => $options.submit()),
    d: common_vendor.gei(_ctx, "")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/icons.js.map
