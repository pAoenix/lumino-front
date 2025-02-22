"use strict";
const uni_modules_uviewPlus_components_uKeyboard_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-keyboard",
  data() {
    return {};
  },
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uKeyboard_props.props],
  emits: ["change", "close", "confirm", "cancel", "backspace"],
  methods: {
    change(e) {
      this.$emit("change", e);
    },
    // 键盘关闭
    popupClose() {
      this.$emit("close");
    },
    // 输入完成
    onConfirm() {
      this.$emit("confirm");
    },
    // 取消输入
    onCancel() {
      this.$emit("cancel");
    },
    // 退格键
    backspace() {
      this.$emit("backspace");
    }
  }
};
if (!Array) {
  const _easycom_u_number_keyboard2 = common_vendor.resolveComponent("u-number-keyboard");
  const _easycom_u_car_keyboard2 = common_vendor.resolveComponent("u-car-keyboard");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_number_keyboard2 + _easycom_u_car_keyboard2 + _easycom_u_popup2)();
}
const _easycom_u_number_keyboard = () => "../u-number-keyboard/u-number-keyboard.js";
const _easycom_u_car_keyboard = () => "../u-car-keyboard/u-car-keyboard.js";
const _easycom_u_popup = () => "../u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_number_keyboard + _easycom_u_car_keyboard + _easycom_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.tooltip
  }, _ctx.tooltip ? common_vendor.e({
    b: _ctx.showCancel
  }, _ctx.showCancel ? {
    c: common_vendor.t(_ctx.showCancel && _ctx.cancelText),
    d: common_vendor.o((...args) => $options.onCancel && $options.onCancel(...args))
  } : {}, {
    e: _ctx.showTips
  }, _ctx.showTips ? {
    f: common_vendor.t(_ctx.tips ? _ctx.tips : _ctx.mode == "number" ? "数字键盘" : _ctx.mode == "card" ? "身份证键盘" : "车牌号键盘")
  } : {}, {
    g: _ctx.showConfirm
  }, _ctx.showConfirm ? {
    h: common_vendor.t(_ctx.showConfirm && _ctx.confirmText),
    i: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  } : {}) : {}, {
    j: _ctx.mode == "number" || _ctx.mode == "card"
  }, _ctx.mode == "number" || _ctx.mode == "card" ? {
    k: common_vendor.o($options.backspace),
    l: common_vendor.o($options.change),
    m: common_vendor.p({
      random: _ctx.random,
      mode: _ctx.mode,
      dotDisabled: _ctx.dotDisabled
    })
  } : {
    n: common_vendor.o($options.backspace),
    o: common_vendor.o($options.change),
    p: common_vendor.p({
      random: _ctx.random,
      autoChange: _ctx.autoChange
    })
  }, {
    q: common_vendor.o($options.popupClose),
    r: common_vendor.p({
      overlay: _ctx.overlay,
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      mode: "bottom",
      popup: false,
      show: _ctx.show,
      safeAreaInsetBottom: _ctx.safeAreaInsetBottom,
      zIndex: _ctx.zIndex,
      customStyle: {
        backgroundColor: "rgb(214, 218, 220)"
      }
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5c3a4793"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-keyboard/u-keyboard.js.map
