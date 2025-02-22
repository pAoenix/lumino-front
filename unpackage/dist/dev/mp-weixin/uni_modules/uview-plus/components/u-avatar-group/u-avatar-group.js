"use strict";
const uni_modules_uviewPlus_components_uAvatarGroup_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_libs_function_test = require("../../libs/function/test.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-avatar-group",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uAvatarGroup_props.props],
  data() {
    return {};
  },
  computed: {
    showUrl() {
      return this.urls.slice(0, this.maxCount);
    }
  },
  emits: ["showMore"],
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    testObject: uni_modules_uviewPlus_libs_function_test.test.object,
    clickHandler() {
      this.$emit("showMore");
    }
  }
};
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  (_easycom_u_avatar2 + _easycom_up_text2)();
}
const _easycom_u_avatar = () => "../u-avatar/u-avatar.js";
const _easycom_up_text = () => "../u-text/u-text.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_up_text)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.showUrl, (item, index, i0) => {
      return common_vendor.e({
        a: "3bd09520-0-" + i0,
        b: common_vendor.p({
          size: _ctx.size,
          shape: _ctx.shape,
          mode: _ctx.mode,
          src: $options.testObject(item) ? _ctx.keyName && item[_ctx.keyName] || item.url : item
        }),
        c: _ctx.showMore && index === $options.showUrl.length - 1 && (_ctx.urls.length > _ctx.maxCount || _ctx.extraValue > 0)
      }, _ctx.showMore && index === $options.showUrl.length - 1 && (_ctx.urls.length > _ctx.maxCount || _ctx.extraValue > 0) ? {
        d: "3bd09520-1-" + i0,
        e: common_vendor.p({
          color: "#ffffff",
          size: _ctx.size * 0.4,
          text: `+${_ctx.extraValue || _ctx.urls.length - $options.showUrl.length}`,
          align: "center",
          customStyle: "justify-content: center"
        }),
        f: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args), index)
      } : {}, {
        g: index,
        h: index === 0 ? 0 : $options.addUnit(-_ctx.size * _ctx.gap)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3bd09520"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-avatar-group/u-avatar-group.js.map
