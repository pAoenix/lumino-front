"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 头像图片组
    urls: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.urls
    },
    // 最多展示的头像数量
    maxCount: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.maxCount
    },
    // 头像形状
    shape: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.shape
    },
    // 图片裁剪模式
    mode: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.mode
    },
    // 超出maxCount时是否显示查看更多的提示
    showMore: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.showMore
    },
    // 头像大小
    size: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.size
    },
    // 指定从数组的对象元素中读取哪个属性作为图片地址
    keyName: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.keyName
    },
    // 头像之间的遮挡比例
    gap: {
      type: [String, Number],
      validator(value) {
        return value >= 0 && value <= 1;
      },
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.gap
    },
    // 需额外显示的值
    extraValue: {
      type: [Number, String],
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.avatarGroup.extraValue
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-avatar-group/props.js.map
