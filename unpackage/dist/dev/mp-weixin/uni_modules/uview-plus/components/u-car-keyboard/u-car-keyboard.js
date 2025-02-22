"use strict";
const uni_modules_uviewPlus_components_uCarKeyboard_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-car-keyboard",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uCarKeyboard_props.props],
  data() {
    return {
      // 车牌输入时，abc=true为输入车牌号码，bac=false为输入省份中文简称
      abc: false
    };
  },
  computed: {
    areaList() {
      let data = [
        "京",
        "沪",
        "粤",
        "津",
        "冀",
        "豫",
        "云",
        "辽",
        "黑",
        "湘",
        "皖",
        "鲁",
        "苏",
        "浙",
        "赣",
        "鄂",
        "桂",
        "甘",
        "晋",
        "陕",
        "蒙",
        "吉",
        "闽",
        "贵",
        "渝",
        "川",
        "青",
        "琼",
        "宁",
        "挂",
        "藏",
        "港",
        "澳",
        "新",
        "使",
        "学"
      ];
      let tmp = [];
      if (this.random)
        data = uni_modules_uviewPlus_libs_function_index.randomArray(data);
      tmp[0] = data.slice(0, 10);
      tmp[1] = data.slice(10, 20);
      tmp[2] = data.slice(20, 30);
      tmp[3] = data.slice(30, 36);
      return tmp;
    },
    engKeyBoardList() {
      let data = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M"
      ];
      let tmp = [];
      if (this.random)
        data = uni_modules_uviewPlus_libs_function_index.randomArray(data);
      tmp[0] = data.slice(0, 10);
      tmp[1] = data.slice(10, 20);
      tmp[2] = data.slice(20, 30);
      tmp[3] = data.slice(30, 36);
      return tmp;
    }
  },
  emits: ["change", "backspace"],
  methods: {
    // 点击键盘按钮
    carInputClick(i, j) {
      let value = "";
      if (this.abc)
        value = this.engKeyBoardList[i][j];
      else
        value = this.areaList[i][j];
      if (!this.abc && this.autoChange)
        uni_modules_uviewPlus_libs_function_index.sleep(200).then(() => this.abc = true);
      this.$emit("change", value);
    },
    // 修改汽车牌键盘的输入模式，中文|英文
    changeCarInputMode() {
      this.abc = !this.abc;
    },
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
    a: common_vendor.f($data.abc ? $options.engKeyBoardList : $options.areaList, (group, i, i0) => {
      return common_vendor.e({
        a: i === 3
      }, i === 3 ? {
        b: common_vendor.n(!$data.abc && "u-keyboard__button__inner-wrapper__left__lang--active"),
        c: common_vendor.n($data.abc && "u-keyboard__button__inner-wrapper__left__lang--active"),
        d: common_vendor.o((...args) => $options.changeCarInputMode && $options.changeCarInputMode(...args), i)
      } : {}, {
        e: common_vendor.f(group, (item, j, i1) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => $options.carInputClick(i, j), j),
            c: j
          };
        }),
        f: i === 3
      }, i === 3 ? {
        g: "e3990159-0-" + i0,
        h: common_vendor.p({
          size: "28",
          name: "backspace",
          color: "#303133"
        }),
        i: common_vendor.o((...args) => $options.backspaceClick && $options.backspaceClick(...args), i),
        j: common_vendor.o((...args) => $options.clearTimer && $options.clearTimer(...args), i)
      } : {}, {
        k: i,
        l: i,
        m: common_vendor.n(i + 1 === 4 && "u-keyboard__button--center")
      });
    }),
    b: common_vendor.o((...args) => _ctx.noop && _ctx.noop(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e3990159"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-car-keyboard/u-car-keyboard.js.map
