"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 键盘的类型，number-数字键盘，card-身份证键盘
    mode: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.numberKeyboard.value
    },
    // 是否显示键盘的"."符号
    dotDisabled: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.numberKeyboard.dotDisabled
    },
    // 是否打乱键盘按键的顺序
    random: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.numberKeyboard.random
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-number-keyboard/props.js.map
