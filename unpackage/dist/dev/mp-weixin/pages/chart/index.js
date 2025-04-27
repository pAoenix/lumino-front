"use strict";
const common_vendor = require("../../common/vendor.js");
const SvgIcon = () => "../component/svg-icon.js";
const CustomTabbar = () => "../component/custom-tabbar.js";
const _sfc_main = {
  components: {
    SvgIcon,
    CustomTabbar
  },
  onShow: function() {
    if (!common_vendor.index.getStorageSync("token")) {
      common_vendor.index.switchTab({
        url: `/pages/my/index`
      });
      return;
    }
  }
};
if (!Array) {
  const _component_SvgIcon = common_vendor.resolveComponent("SvgIcon");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_component_SvgIcon + _component_CustomTabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      name: "icon-tixing-fill"
    }),
    b: common_vendor.p({
      selected: 1
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chart/index.js.map
