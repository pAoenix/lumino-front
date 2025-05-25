"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    selected: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabList: [
        {
          pagePath: "/pages/details/index",
          text: "账本",
          icon: "/static/details.png",
          activeIcon: "/static/detailsHL.png"
        },
        {
          pagePath: "/pages/chart/index",
          text: "图表",
          icon: "/static/chart.png",
          activeIcon: "/static/chartHL.png"
        },
        {
          pagePath: "/pages/index/index",
          text: "用户",
          icon: "/static/add.png",
          activeIcon: "/static/addHL.png"
        },
        {
          pagePath: "/pages/find/index",
          text: "发现",
          icon: "/static/find.png",
          activeIcon: "/static/findHL.png"
        },
        {
          pagePath: "/pages/my/index",
          text: "设置",
          icon: "/static/my.png",
          activeIcon: "/static/myHL.png"
        }
      ]
    };
  },
  methods: {
    switchTab(index) {
      const url = this.tabList[index].pagePath;
      if (this.selected !== index) {
        common_vendor.index.switchTab({
          url
        });
      } else {
        this.$emit("change");
      }
      this.$emit("tabPage", url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabList, (item, index, i0) => {
      return {
        a: index == 2 ? 1 : "",
        b: $props.selected === index ? item.activeIcon : item.icon,
        c: common_vendor.t(item.text),
        d: index,
        e: $props.selected === index ? 1 : "",
        f: common_vendor.o(($event) => $options.switchTab(index), index)
      };
    }),
    b: common_vendor.gei(_ctx, "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a57507ae"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/component/custom-tabbar.js.map
