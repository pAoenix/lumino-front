"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
require("../../libs/config/config.js");
require("../u-datetime-picker/datetimePicker.js");
require("../u-icon/icon.js");
require("../u-link/link.js");
require("../u-loading-icon/loadingIcon.js");
require("../u-navbar/navbar.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 是否打乱键盘按键的顺序
    random: {
      type: Boolean,
      default: false
    },
    // 输入一个中文后，是否自动切换到英文
    autoChange: {
      type: Boolean,
      default: false
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-car-keyboard/props.js.map
