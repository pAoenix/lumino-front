"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      show: true,
      inputValue: "",
      conutNumber: "",
      current: 0,
      radiolist: [
        {
          name: "支出"
        },
        {
          name: "收入"
        }
        // {
        // 	name: '转账',
        // },
        // {
        // 	name: '预交款',
        // },
      ],
      accountBook: null
    };
  },
  watch: {
    inputValue: {
      handler(newVal) {
        common_vendor.index.__f__("log", "at pages/account/add-count.vue:73", newVal);
        if (newVal.indexOf("+") !== -1 || newVal.indexOf("-") !== -1 || newVal.indexOf("*") !== -1 || newVal.indexOf("/") !== -1) {
          this.conutNumber = `${this.calculateExpression(newVal).toFixed(2)}`;
        } else {
          this.conutNumber = "";
        }
      },
      deep: true,
      immediate: true
    }
  },
  onShow: function() {
    const accountBook = getApp().globalData.accountBookData;
    common_vendor.index.__f__("log", "at pages/account/add-count.vue:91", accountBook);
    this.accountBook = accountBook;
    getApp().globalData.accountBookData = null;
  },
  methods: {
    sectionChange(index) {
      this.current = index;
    },
    calculateExpression(expression) {
      expression = expression.trim();
      if (expression === "") {
        return 0;
      }
      const precedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
      };
      const operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
      };
      let tokens = expression.match(/\d+\.\d+|\d+|\+|\-|\*|\/|\(|\)/g) || [];
      if (/[\+\-\*\/]$/.test(expression)) {
        tokens = tokens.slice(0, -1);
      }
      const values = [];
      const ops = [];
      const applyOp = () => {
        const op = ops.pop();
        const b = values.pop();
        const a = values.pop();
        values.push(operators[op](a, b));
      };
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (/^\d+(\.\d+)?$/.test(token)) {
          values.push(parseFloat(token));
        } else if (token === "(") {
          ops.push(token);
        } else if (token === ")") {
          while (ops[ops.length - 1] !== "(") {
            applyOp();
          }
          ops.pop();
        } else {
          while (ops.length > 0 && precedence[ops[ops.length - 1]] >= precedence[token]) {
            applyOp();
          }
          ops.push(token);
        }
      }
      while (ops.length > 0) {
        applyOp();
      }
      return values[0];
    },
    keyboardChange(val) {
      this.inputValue += val;
    },
    keyboardChanges(val) {
      if (!this.inputValue)
        return;
      this.inputValue += val;
    },
    submit() {
      let number = this.conutNumber.length ? this.conutNumber : this.inputValue;
      getApp().globalData.billCount = {
        ...this.accountBook,
        amount: number,
        type: Number(this.current + 1)
      };
      common_vendor.index.navigateTo({
        url: `/pages/account/add-bill`
      });
    },
    keyboardBackspace(val) {
      if (this.inputValue.length) {
        this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      }
    }
  }
};
if (!Array) {
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  const _component_template = common_vendor.resolveComponent("template");
  const _easycom_up_keyboard2 = common_vendor.resolveComponent("up-keyboard");
  (_easycom_up_subsection2 + _component_template + _easycom_up_keyboard2)();
}
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_keyboard = () => "../../uni_modules/uview-plus/components/u-keyboard/u-keyboard.js";
if (!Math) {
  (_easycom_up_subsection + _easycom_up_keyboard)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.sectionChange),
    b: common_vendor.p({
      activeColor: "#55c9c9",
      list: $data.radiolist,
      current: $data.current
    }),
    c: common_vendor.t($data.conutNumber.length ? $data.conutNumber : Number($data.inputValue).toFixed(2)),
    d: common_vendor.t($data.inputValue),
    e: $data.conutNumber,
    f: common_vendor.o(($event) => $options.keyboardChanges("+")),
    g: common_vendor.o(($event) => $options.keyboardChanges("-")),
    h: common_vendor.o(($event) => $options.keyboardChanges("*")),
    i: common_vendor.o(($event) => $options.keyboardChanges("/")),
    j: common_vendor.sr("uKeyboard", "fe19e2ea-1"),
    k: common_vendor.o($options.keyboardChange),
    l: common_vendor.o($options.keyboardBackspace),
    m: common_vendor.o($options.submit),
    n: common_vendor.p({
      overlay: false,
      safeAreaInsetBottom: true,
      tips: "请输入账单金额",
      mode: "number",
      show: $data.show,
      showCancel: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/add-count.js.map
