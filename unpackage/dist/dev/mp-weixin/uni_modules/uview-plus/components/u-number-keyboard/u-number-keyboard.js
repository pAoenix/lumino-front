"use strict";
const uni_modules_uviewPlus_components_uNumberKeyboard_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-number-keyboard",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uNumberKeyboard_props.props],
  data() {
    return {
      backspace: "backspace",
      // 退格键内容
      dot: ".",
      // 点
      timer: null,
      // 长按多次删除的事件监听
      cardX: "X"
      // 身份证的X符号
    };
  },
  computed: {
    // 键盘需要显示的内容
    numList() {
      if (this.dotDisabled && this.mode == "number") {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        } else {
          return uni_modules_uviewPlus_libs_function_index.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        }
      } else if (!this.dotDisabled && this.mode == "number") {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0];
        } else {
          return uni_modules_uviewPlus_libs_function_index.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]);
        }
      } else if (this.mode == "card") {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0];
        } else {
          return uni_modules_uviewPlus_libs_function_index.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]);
        }
      }
    },
    // 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
    itemStyle() {
      return (index) => {
        let style = {};
        if (this.mode == "number" && this.dotDisabled && index == 9)
          style.width = "464rpx";
        return style;
      };
    },
    // 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
    btnBgGray() {
      return (index) => {
        if (!this.random && index == 9 && (this.mode != "number" || this.mode == "number" && !this.dotDisabled))
          return true;
        else
          return false;
      };
    }
  },
  created() {
  },
  emits: ["backspace", "change"],
  methods: {
    // 点击退格键
    backspaceClick() {
      this.$emit("backspace");
      clearInterval(this.timer);
      this.timer = null;
      this.timer = setInterval(() => {
        this.$emit("backspace");
      }, 250);
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 获取键盘显示的内容
    keyboardClick(val) {
      if (!this.dotDisabled && val != this.dot && val != this.cardX)
        val = Number(val);
      this.$emit("change", val);
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.numList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.s($options.itemStyle(index)),
        c: common_vendor.o(($event) => $options.keyboardClick(item), index),
        d: index
      };
    }),
    b: common_vendor.p({
      name: "backspace",
      color: "#303133",
      size: "28"
    }),
    c: common_vendor.o((...args) => $options.backspaceClick && $options.backspaceClick(...args)),
    d: common_vendor.o((...args) => $options.clearTimer && $options.clearTimer(...args)),
    e: common_vendor.o((...args) => _ctx.noop && _ctx.noop(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d73731be"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-number-keyboard/u-number-keyboard.js.map
