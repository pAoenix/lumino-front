"use strict";
const uni_modules_uviewPlus_components_uDropdown_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-dropdown",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uDropdown_props.props],
  data() {
    return {
      showDropdown: true,
      // 是否打开下来菜单,
      menuList: [],
      // 显示的菜单
      active: false,
      // 下拉菜单的状态
      // 当前是第几个菜单处于激活状态，小程序中此处不能写成false或者""，否则后续将current赋值为0，
      // 无能的TX没有使用===而是使用==判断，导致程序认为前后二者没有变化，从而不会触发视图更新
      current: 99999,
      // 外层内容的样式，初始时处于底层，且透明
      contentStyle: {
        zIndex: -1,
        opacity: 0
      },
      // 让某个菜单保持高亮的状态
      highlightIndex: 99999,
      contentHeight: 0
    };
  },
  computed: {
    // 下拉出来部分的样式
    popupStyle() {
      let style = {};
      style.transform = `translateY(${this.active ? 0 : "-100%"})`;
      style["transition-duration"] = this.duration / 1e3 + "s";
      style.borderRadius = `0 0 ${uni_modules_uviewPlus_libs_function_index.addUnit(this.borderRadius)} ${uni_modules_uviewPlus_libs_function_index.addUnit(this.borderRadius)}`;
      return style;
    }
  },
  created() {
    this.children = [];
  },
  mounted() {
    this.getContentHeight();
  },
  emits: ["open", "close"],
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    init() {
      this.menuList = [];
      this.children.map((child) => {
        child.init();
      });
    },
    // 点击菜单
    menuClick(index) {
      if (this.menuList[index].disabled)
        return;
      if (index === this.current && this.closeOnClickSelf) {
        this.close();
        setTimeout(() => {
          this.children[index].active = false;
        }, this.duration);
        return;
      }
      this.open(index);
    },
    // 打开下拉菜单
    open(index) {
      if (this.contentHeight < 1)
        this.getContentHeight();
      this.contentStyle = {
        zIndex: 11
      };
      this.active = true;
      this.current = index;
      this.children.map((val, idx) => {
        val.active = index == idx ? true : false;
      });
      this.$emit("open", this.current);
    },
    // 设置下拉菜单处于收起状态
    close() {
      this.$emit("close", this.current);
      this.active = false;
      this.current = 99999;
      this.contentStyle = {
        zIndex: -1,
        opacity: 0
      };
    },
    // 点击遮罩
    maskClick() {
      if (!this.closeOnClickMask)
        return;
      this.close();
    },
    // 外部手动设置某个菜单高亮
    highlight(index = void 0) {
      this.highlightIndex = index !== void 0 ? index : 99999;
    },
    // 获取下拉菜单内容的高度
    getContentHeight() {
      let windowHeight = uni_modules_uviewPlus_libs_function_index.getWindowInfo().windowHeight;
      this.$uGetRect(".u-dropdown__menu").then((res) => {
        this.contentHeight = windowHeight - res.bottom;
      });
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
    a: common_vendor.f($data.menuList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: item.disabled ? "#c0c4cc" : index === $data.current || $data.highlightIndex == index ? _ctx.activeColor : _ctx.inactiveColor,
        c: "029e9a16-0-" + i0,
        d: common_vendor.p({
          ["custom-style"]: {
            display: "flex"
          },
          name: _ctx.menuIcon,
          size: $options.addUnit(_ctx.menuIconSize),
          color: index === $data.current || $data.highlightIndex == index ? _ctx.activeColor : "#c0c4cc"
        }),
        e: index === $data.current ? 1 : "",
        f: index,
        g: common_vendor.o(($event) => $options.menuClick(index), index)
      };
    }),
    b: $options.addUnit(_ctx.titleSize),
    c: $options.addUnit(_ctx.height),
    d: _ctx.borderBottom ? 1 : "",
    e: common_vendor.o(() => {
    }),
    f: common_vendor.s($options.popupStyle),
    g: common_vendor.s($data.contentStyle),
    h: common_vendor.s({
      transition: `opacity ${_ctx.duration / 1e3}s linear`,
      top: $options.addUnit(_ctx.height),
      height: $data.contentHeight + "px"
    }),
    i: common_vendor.o((...args) => $options.maskClick && $options.maskClick(...args)),
    j: common_vendor.o(() => {
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-029e9a16"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-dropdown/u-dropdown.js.map
