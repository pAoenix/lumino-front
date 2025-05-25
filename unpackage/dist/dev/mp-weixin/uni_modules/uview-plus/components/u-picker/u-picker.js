"use strict";
const uni_modules_uviewPlus_components_uPicker_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_libs_function_test = require("../../libs/function/test.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-picker",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uPicker_props.props],
  data() {
    return {
      // 上一次选择的列索引
      lastIndex: [],
      // 索引值 ，对应picker-view的value
      innerIndex: [],
      // 各列的值
      innerColumns: [],
      // 上一次的变化列索引
      columnIndex: 0,
      showByClickInput: false,
      currentActiveValue: []
      //当前用户选中，但是还没确认的值，用户没做change操作时候，点击确认可以默认选中第一个
    };
  },
  watch: {
    // 监听默认索引的变化，重新设置对应的值
    defaultIndex: {
      immediate: true,
      deep: true,
      handler(n, o) {
        if (!o || n.join("/") != o.join("/")) {
          this.setIndexs(n, true);
        }
      }
    },
    // 监听columns参数的变化
    columns: {
      immediate: true,
      deep: true,
      handler(n) {
        this.setColumns(n);
      }
    }
  },
  emits: ["close", "cancel", "confirm", "change", "update:modelValue", "update:show"],
  computed: {
    //已选&&已确认的值显示在input上面的文案
    inputLabel() {
      let firstItem = this.innerColumns[0] && this.innerColumns[0][0];
      if (firstItem && Object.prototype.toString.call(firstItem) === "[object Object]") {
        let res = this.innerColumns[0].filter((item) => this.modelValue.includes(item["id"]));
        res = res.map((item) => item[this.keyName]);
        return res.join("/");
      } else {
        return this.modelValue.join("/");
      }
    },
    //已选，待确认的值
    inputValue() {
      let items = this.innerColumns.map((item, index) => item[this.innerIndex[index]]);
      let res = [];
      if (items[0] && Object.prototype.toString.call(items[0]) === "[object Object]") {
        items.forEach((element) => {
          res.push(element && element["id"]);
        });
      } else {
        items.forEach((element, index) => {
          res.push(element);
        });
      }
      return res;
    }
  },
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    testArray: uni_modules_uviewPlus_libs_function_test.test.array,
    // 获取item需要显示的文字，判别为对象还是文本
    getItemText(item) {
      if (uni_modules_uviewPlus_libs_function_test.test.object(item)) {
        return item[this.keyName];
      } else {
        return item;
      }
    },
    // 关闭选择器
    closeHandler() {
      if (this.closeOnClickOverlay) {
        if (this.hasInput) {
          this.showByClickInput = false;
        }
        this.$emit("update:show", false);
        this.$emit("close");
      }
    },
    // 点击工具栏的取消按钮
    cancel() {
      if (this.hasInput) {
        this.showByClickInput = false;
      }
      this.$emit("update:show", false);
      this.$emit("cancel");
    },
    // 点击工具栏的确定按钮
    confirm() {
      if (!this.currentActiveValue.length) {
        let arr = [0];
        if (Array.isArray(this.defaultIndex) && this.defaultIndex.length == this.innerColumns.length) {
          arr = [...this.defaultIndex];
        } else {
          arr = Array(this.innerColumns.length).fill(0);
        }
        this.setLastIndex(arr);
        this.setIndexs(arr);
      }
      this.$emit("update:modelValue", this.inputValue);
      if (this.hasInput) {
        this.showByClickInput = false;
      }
      this.$emit("update:show", false);
      this.$emit("confirm", {
        indexs: this.innerIndex,
        value: this.innerColumns.map((item, index) => item[this.innerIndex[index]]),
        values: this.innerColumns
      });
    },
    // 选择器某一列的数据发生变化时触发
    changeHandler(e) {
      const {
        value
      } = e.detail;
      let index = 0, columnIndex = 0;
      this.currentActiveValue = value;
      for (let i = 0; i < value.length; i++) {
        let item = value[i];
        if (item !== (this.lastIndex[i] || 0)) {
          columnIndex = i;
          index = item;
          break;
        }
      }
      this.columnIndex = columnIndex;
      const values = this.innerColumns;
      this.setLastIndex(value);
      this.setIndexs(value);
      if (!this.hasInput) {
        this.$emit("update:modelValue", this.inputValue);
      }
      this.$emit("change", {
        value: this.innerColumns.map((item, index2) => item[value[index2]]),
        index,
        indexs: value,
        // values为当前变化列的数组内容
        values,
        columnIndex
      });
    },
    // 设置index索引，此方法可被外部调用设置
    setIndexs(index, setLastIndex) {
      this.innerIndex = uni_modules_uviewPlus_libs_function_index.deepClone(index);
      if (setLastIndex) {
        this.setLastIndex(index);
      }
    },
    // 记录上一次的各列索引位置
    setLastIndex(index) {
      this.lastIndex = uni_modules_uviewPlus_libs_function_index.deepClone(index);
    },
    // 设置对应列选项的所有值
    setColumnValues(columnIndex, values) {
      this.innerColumns.splice(columnIndex, 1, values);
      this.setLastIndex(this.innerIndex.slice(0, columnIndex));
      let tmpIndex = uni_modules_uviewPlus_libs_function_index.deepClone(this.innerIndex);
      for (let i = 0; i < this.innerColumns.length; i++) {
        if (i > this.columnIndex) {
          tmpIndex[i] = 0;
        }
      }
      this.setIndexs(tmpIndex);
    },
    // 获取对应列的所有选项
    getColumnValues(columnIndex) {
      (async () => {
        await uni_modules_uviewPlus_libs_function_index.sleep();
      })();
      return this.innerColumns[columnIndex];
    },
    // 设置整体各列的columns的值
    setColumns(columns) {
      this.innerColumns = uni_modules_uviewPlus_libs_function_index.deepClone(columns);
      if (this.innerIndex.length === 0) {
        this.innerIndex = new Array(columns.length).fill(0);
      }
    },
    // 获取各列选中值对应的索引
    getIndexs() {
      return this.innerIndex;
    },
    // 获取各列选中的值
    getValues() {
      (async () => {
        await uni_modules_uviewPlus_libs_function_index.sleep();
      })();
      return this.innerColumns.map((item, index) => item[this.innerIndex[index]]);
    }
  }
};
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_u_toolbar2 = common_vendor.resolveComponent("u-toolbar");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_up_input2 + _easycom_u_toolbar2 + _easycom_u_loading_icon2 + _easycom_u_popup2)();
}
const _easycom_up_input = () => "../u-input/u-input.js";
const _easycom_u_toolbar = () => "../u-toolbar/u-toolbar.js";
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
const _easycom_u_popup = () => "../u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_input + _easycom_u_toolbar + _easycom_u_loading_icon + _easycom_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.hasInput
  }, _ctx.hasInput ? {
    b: common_vendor.o(($event) => $options.inputLabel = $event),
    c: common_vendor.p({
      placeholder: _ctx.placeholder,
      readonly: true,
      border: "surround",
      modelValue: $options.inputLabel
    }),
    d: common_vendor.o(($event) => $data.showByClickInput = !$data.showByClickInput)
  } : {}, {
    e: _ctx.showToolbar
  }, _ctx.showToolbar ? {
    f: common_vendor.o($options.cancel),
    g: common_vendor.o($options.confirm),
    h: common_vendor.p({
      cancelColor: _ctx.cancelColor,
      confirmColor: _ctx.confirmColor,
      cancelText: _ctx.cancelText,
      confirmText: _ctx.confirmText,
      title: _ctx.title,
      rightSlot: _ctx.toolbarRightSlot ? true : false
    })
  } : {}, {
    i: common_vendor.f($data.innerColumns, (item, index, i0) => {
      return common_vendor.e({
        a: $options.testArray(item)
      }, $options.testArray(item) ? {
        b: common_vendor.f(item, (item1, index1, i1) => {
          return {
            a: common_vendor.t($options.getItemText(item1)),
            b: common_vendor.n(index1 === $data.innerIndex[index] && "u-picker__view__column__item--selected"),
            c: index1,
            d: index1 === $data.innerIndex[index] ? "bold" : "normal"
          };
        }),
        c: $options.addUnit(_ctx.itemHeight),
        d: $options.addUnit(_ctx.itemHeight)
      } : {}, {
        e: index
      });
    }),
    j: `height: ${$options.addUnit(_ctx.itemHeight)}`,
    k: $data.innerIndex,
    l: _ctx.immediateChange,
    m: `${$options.addUnit(_ctx.visibleItemCount * _ctx.itemHeight)}`,
    n: common_vendor.o((...args) => $options.changeHandler && $options.changeHandler(...args)),
    o: _ctx.loading
  }, _ctx.loading ? {
    p: common_vendor.p({
      mode: "circle"
    })
  } : {}, {
    q: common_vendor.o($options.closeHandler),
    r: common_vendor.p({
      show: _ctx.show || _ctx.hasInput && $data.showByClickInput,
      mode: _ctx.popupMode,
      zIndex: _ctx.zIndex
    }),
    s: common_vendor.gei(_ctx, "")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-91b05052"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-picker/u-picker.js.map
