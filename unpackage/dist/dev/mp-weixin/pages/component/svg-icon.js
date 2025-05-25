"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    name: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: "30px"
    },
    class: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "30px"
    }
  },
  computed: {
    svgSrc() {
      return `/static/svg-icon/${this.name}.svg`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.svgSrc,
    b: common_vendor.n($props.class),
    c: $props.width,
    d: $props.height,
    e: common_vendor.gei(_ctx, "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-00742c3c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/component/svg-icon.js.map
