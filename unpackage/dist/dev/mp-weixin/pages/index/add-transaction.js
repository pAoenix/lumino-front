"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_settingTime = require("../../utils/setting-time.js");
const _sfc_main = {
  data() {
    return {
      billUpdateData: null,
      accountBookData: null,
      isTypeActive: 2,
      iconActive: null,
      statusBarHeight: 0,
      IconDatas: [],
      conutNumber: "0",
      description: "",
      keyboards: [
        "7",
        "8",
        "9",
        "time",
        "4",
        "5",
        "6",
        "addSubtract",
        "1",
        "2",
        "3",
        "calculation",
        ".",
        "0",
        "icon",
        "done"
      ],
      timeShow: false,
      timeText: Date.now(),
      accountBookUser: [],
      accountUserUrls: []
    };
  },
  onLoad() {
    const sysInfo = common_vendor.wx$1.getSystemInfoSync();
    this.statusBarHeight = sysInfo.statusBarHeight;
  },
  onShow: function() {
    var _a, _b, _c, _d;
    this.IconDatas = getApp().globalData.iconData;
    const updata = getApp().globalData.updateAcconutData;
    if (updata) {
      this.iconActive = updata.category_id;
      this.textActive = updata.text;
      this.accountBookData = updata;
      this.billUpdateData = updata;
      this.accountBookUser = ((_a = updata.accountBookUser) == null ? void 0 : _a.length) ? updata.accountBookUser : [];
      this.accountUserUrls = ((_b = updata.accountBookUserUrls) == null ? void 0 : _b.length) ? updata.accountBookUserUrls : [];
      this.description = updata.description;
      this.conutNumber = `${updata.amount}`;
      this.isTypeActive = updata.type;
      this.timeText = new Date(updata.date);
    } else {
      const data = getApp().globalData.accountBookData;
      if (data == null ? void 0 : data.iconId) {
        this.iconActive = data.category_id;
      }
      this.accountBookData = data;
      this.accountBookUser = ((_c = data == null ? void 0 : data.accountBookUser) == null ? void 0 : _c.length) ? data.accountBookUser : [];
      this.accountUserUrls = ((_d = data == null ? void 0 : data.accountBookUserUrls) == null ? void 0 : _d.length) ? data.accountBookUserUrls : [];
    }
  },
  methods: {
    setTime(time) {
      return time ? utils_settingTime.formatTime(time) : "";
    },
    tabChange(type) {
      this.isTypeActive = type;
    },
    addIcons() {
      getApp().globalData.icons = 2;
      common_vendor.index.navigateTo({
        url: "/pages/my/icons"
      });
    },
    confirm(e) {
      this.timeText = e.value;
      this.timeShow = false;
    },
    close() {
      this.timeShow = false;
    },
    keyChange(key) {
      if (this.conutNumber == "0") {
        this.conutNumber = key;
      } else {
        this.conutNumber += key;
      }
    },
    calculation(key) {
      if (!this.conutNumber || this.conutNumber == "0") {
        common_vendor.index.showToast({
          title: "请输入数值",
          icon: "none"
        });
      } else {
        if (/[+\-*/]/.test(this.conutNumber)) {
          this.conutNumber = `${this.calculateExpression(
            this.conutNumber
          )}${key}`;
        } else {
          this.conutNumber += key;
        }
      }
    },
    returndFun() {
      if (/^[^+\-*/]*(?:[+\-*/])?$/.test(this.conutNumber)) {
        return "完成";
      } else {
        return "=";
      }
    },
    returnDone() {
      if (/^[^+\-*/]*(?:[+\-*/])?$/.test(this.conutNumber)) {
        let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
        let data = {
          id: this.billUpdateData ? this.billUpdateData.id : void 0,
          amount: Number(this.conutNumber),
          account_book_id: Number(this.accountBookData.accountBookId),
          category_id: this.iconActive,
          date: utils_settingTime.formatDateUTC(this.timeText),
          creator_id: userInfo.id,
          pay_user_id: userInfo.id,
          related_user_ids: this.accountBookUser,
          type: this.isTypeActive,
          description: this.description
        };
        common_vendor.index.request({
          url: `${this.$baseURL}/api/v1/transaction`,
          method: this.billUpdateData ? "PUT" : "POST",
          data,
          success: (res) => {
            var _a, _b, _c, _d;
            if (((_a = res.data) == null ? void 0 : _a.message) && ((_b = res.data) == null ? void 0 : _b.message)) {
              common_vendor.index.showToast({
                title: ((_c = res.data) == null ? void 0 : _c.message) ? (_d = res.data) == null ? void 0 : _d.message : this.billUpdateData ? "修改交易失败" : "创建交易失败",
                icon: "none"
              });
            } else {
              common_vendor.index.showToast({
                title: this.billUpdateData ? "修改交易成功" : "创建交易成功"
              });
              getApp().globalData.accountBookData = null;
              getApp().globalData.updateAcconutData = null;
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            }
          },
          fail: (err) => {
            common_vendor.index.showToast({
              title: this.billUpdateData ? "修改交易失败" : "创建交易失败",
              icon: "none"
            });
          }
        });
      } else {
        this.conutNumber = `${this.calculateExpression(this.conutNumber)}`;
      }
    },
    backspace() {
      if (!this.conutNumber || this.conutNumber == "0" || this.conutNumber.length === 1) {
        this.conutNumber = "0";
      } else {
        this.conutNumber = this.conutNumber.slice(0, -1);
      }
    },
    closeNumber() {
      this.conutNumber = "0";
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
    iconSecelt(item) {
      this.iconActive = item.id;
    }
  }
};
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_avatar_group2 = common_vendor.resolveComponent("up-avatar-group");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_datetime_picker2 = common_vendor.resolveComponent("up-datetime-picker");
  (_easycom_up_avatar2 + _easycom_up_icon2 + _easycom_up_avatar_group2 + _easycom_up_input2 + _easycom_up_datetime_picker2)();
}
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_avatar_group = () => "../../uni_modules/uview-plus/components/u-avatar-group/u-avatar-group.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_up_avatar + _easycom_up_icon + _easycom_up_avatar_group + _easycom_up_input + _easycom_up_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.tabChange(2)),
    b: $data.isTypeActive == 2 ? 1 : "",
    c: common_vendor.o(($event) => $options.tabChange(1)),
    d: $data.isTypeActive == 1 ? 1 : "",
    e: `${$data.statusBarHeight}px`,
    f: common_vendor.f($data.IconDatas, (item, index, i0) => {
      return {
        a: "efe87702-0-" + i0,
        b: common_vendor.p({
          src: item.icon_url ? item.icon_url : _ctx.pic,
          size: "40"
        }),
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => $options.iconSecelt(item), index),
        e: $data.iconActive == item.id ? 1 : "",
        f: index
      };
    }),
    g: common_vendor.p({
      name: "plus-circle",
      color: "#55c9c9",
      size: "20"
    }),
    h: common_vendor.o(($event) => $options.addIcons()),
    i: $data.iconActive ? 1 : "",
    j: $data.iconActive
  }, $data.iconActive ? common_vendor.e({
    k: common_vendor.t($data.accountUserUrls && $data.accountUserUrls.length ? $data.accountUserUrls.length : 0),
    l: common_vendor.p({
      urls: $data.accountUserUrls,
      size: "25",
      gap: "0.4"
    }),
    m: common_vendor.t($data.conutNumber),
    n: $data.conutNumber && $data.conutNumber != "0"
  }, $data.conutNumber && $data.conutNumber != "0" ? {
    o: common_vendor.o(($event) => $options.closeNumber())
  } : {}, {
    p: common_vendor.o(($event) => $data.description = $event),
    q: common_vendor.p({
      autoHeight: true,
      placeholder: "点击填写备注",
      modelValue: $data.description
    }),
    r: common_vendor.f($data.keyboards, (item, k0, i0) => {
      return common_vendor.e({
        a: item == "time"
      }, item == "time" ? common_vendor.e({
        b: $options.setTime($data.timeText) == $options.setTime(Date.now())
      }, $options.setTime($data.timeText) == $options.setTime(Date.now()) ? {
        c: "efe87702-4-" + i0,
        d: common_vendor.p({
          name: "calendar",
          size: "20"
        })
      } : {
        e: common_vendor.t($options.setTime($data.timeText))
      }, {
        f: common_vendor.o(($event) => $data.timeShow = true, item)
      }) : item == "icon" ? {
        h: "efe87702-5-" + i0,
        i: common_vendor.p({
          name: "backspace",
          size: "25"
        }),
        j: common_vendor.o(($event) => $options.backspace(), item)
      } : item == "done" ? {
        l: common_vendor.t($options.returndFun()),
        m: common_vendor.o(($event) => $options.returnDone(), item)
      } : item == "addSubtract" ? {
        o: common_vendor.o(($event) => $options.calculation("+"), item),
        p: common_vendor.o(($event) => $options.calculation("-"), item)
      } : item == "calculation" ? {
        r: common_vendor.o(($event) => $options.calculation("*"), item),
        s: common_vendor.o(($event) => $options.calculation("/"), item)
      } : {
        t: common_vendor.t(item),
        v: common_vendor.o(($event) => $options.keyChange(item), item)
      }, {
        g: item == "icon",
        k: item == "done",
        n: item == "addSubtract",
        q: item == "calculation",
        w: item,
        x: Boolean(["addSubtract", "calculation", "done"].includes(item)) ? 1 : ""
      });
    })
  }) : {}, {
    s: $data.timeShow
  }, $data.timeShow ? {
    t: common_vendor.o($options.confirm),
    v: common_vendor.o($options.close),
    w: common_vendor.o($options.close),
    x: common_vendor.o(($event) => $data.timeText = $event),
    y: common_vendor.p({
      title: "选择日期",
      show: $data.timeShow,
      mode: "date",
      modelValue: $data.timeText
    })
  } : {}, {
    z: common_vendor.gei(_ctx, "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/add-transaction.js.map
