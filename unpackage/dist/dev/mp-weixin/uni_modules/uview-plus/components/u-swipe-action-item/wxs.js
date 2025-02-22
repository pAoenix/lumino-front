"use strict";
const wxs = {
  methods: {
    // 关闭时执行
    closeHandler() {
      this.status = "close";
    },
    setState(status) {
      this.status = status;
    },
    closeOther() {
      this.parent && this.parent.closeOther(this);
    }
  }
};
exports.wxs = wxs;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-swipe-action-item/wxs.js.map
