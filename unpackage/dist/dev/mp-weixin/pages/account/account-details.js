"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      updateAcconutData: null
    };
  },
  onShow: function() {
    getApp().globalData.accountBookList;
    getApp().globalData.userList;
    const data = getApp().globalData.updateAcconutData;
    common_vendor.index.__f__("log", "at pages/account/account-details.vue:18", data);
    this.updateAcconutData = data;
    getApp().globalData.updateAcconutData = null;
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.gei(_ctx, "")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/account-details.js.map
