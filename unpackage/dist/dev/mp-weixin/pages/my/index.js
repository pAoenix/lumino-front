"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const CustomTabbar = () => "../component/custom-tabbar.js";
const _sfc_main = {
  components: {
    CustomTabbar
  },
  data() {
    return {
      pic: "/static/logo.png",
      show: true,
      isLogin: false,
      userName: "",
      userFile: "",
      phone_number: ""
    };
  },
  onShow: function() {
    if (common_vendor.index.getStorageSync("token")) {
      this.isLogin = true;
      if (common_vendor.index.getStorageSync("userInfo")) {
        let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
        common_vendor.index.__f__("log", "at pages/my/index.vue:88", userInfo, "-----userInfo");
        this.userFile = userInfo.icon_url;
      } else {
        this.userFile = null;
      }
      if (common_vendor.index.getStorageSync("userName")) {
        this.userName = common_vendor.index.getStorageSync("userName");
      } else {
        this.userName = "";
      }
      if (common_vendor.index.getStorageSync("phone_number")) {
        this.phone_number = common_vendor.index.getStorageSync("phone_number");
      } else {
        this.phone_number = "";
      }
    } else {
      this.isLogin = false;
      this.userName = "";
      this.userFile = null;
      this.phone_number = "";
    }
  },
  onLoad() {
  },
  mounted() {
  },
  methods: {
    iconsSetting() {
      common_vendor.index.navigateTo({
        url: "/pages/my/icons"
      });
    },
    async login() {
      common_vendor.index.navigateTo({
        url: "/pages/my/login"
      });
    },
    updateUser() {
      common_vendor.index.navigateTo({
        url: "/pages/my/login"
      });
    },
    outLogin() {
      common_vendor.index.setStorageSync("token", "");
      common_vendor.index.setStorageSync("userInfo", "");
      common_vendor.index.setStorageSync("userName", "");
      common_vendor.index.setStorageSync("phone_number", "");
      this.isLogin = false;
      this.userName = "";
      this.userFile = null;
      this.phone_number = "";
    },
    async onGetPhoneNumber(e) {
      common_vendor.index.__f__("log", "at pages/my/index.vue:139", common_vendor.index.getStorageSync("token"), "--->");
      common_vendor.index.__f__("log", "at pages/my/index.vue:140", e, "-----<<<<");
      const loginRes = await common_vendor.index.login({
        provider: "weixin"
      });
      common_vendor.index.__f__("log", "at pages/my/index.vue:145", loginRes);
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        common_vendor.index.showToast({
          title: "用户取消授权",
          icon: "none"
        });
        return;
      }
      try {
        const loginRes2 = await common_vendor.index.login({
          provider: "weixin"
        });
        const code = loginRes2.code;
        common_vendor.index.__f__("log", "at pages/my/index.vue:159", loginRes2);
        common_vendor.index.__f__("log", "at pages/my/index.vue:161", e.detail);
        return;
        const res = await common_vendor.index.request({
          url: "https://your-server.com/api/wxPhoneLogin",
          method: "POST",
          data: {
            code,
            encryptedData,
            iv
          }
        });
        if (res.data.code === 200) {
          common_vendor.index.showToast({
            title: "登录成功"
          });
        } else {
          common_vendor.index.showToast({
            title: "登录失败",
            icon: "none"
          });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/my/index.vue:186", "获取手机号失败", err);
        common_vendor.index.showToast({
          title: "异常",
          icon: "none"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_cell2 = common_vendor.resolveComponent("up-cell");
  const _easycom_up_cell_group2 = common_vendor.resolveComponent("up-cell-group");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_easycom_up_avatar2 + _easycom_up_icon2 + _easycom_up_cell2 + _easycom_up_cell_group2 + _component_CustomTabbar)();
}
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_up_avatar + _easycom_up_icon + _easycom_up_cell + _easycom_up_cell_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      src: $data.userFile ? $data.userFile : $data.pic,
      size: "120"
    }),
    b: !$data.isLogin
  }, !$data.isLogin ? {
    c: common_vendor.o((...args) => $options.login && $options.login(...args))
  } : {}, {
    d: $data.isLogin
  }, $data.isLogin ? {
    e: common_vendor.t($data.userName ? $data.userName : "lumino用户"),
    f: common_vendor.t($data.phone_number ? $data.phone_number : "-")
  } : {}, {
    g: $data.isLogin
  }, $data.isLogin ? {
    h: common_vendor.o($options.updateUser),
    i: common_vendor.p({
      name: "arrow-right",
      color: "#fff",
      size: "28"
    })
  } : {}, {
    j: common_vendor.p({
      icon: "rmb-circle",
      title: "支付"
    }),
    k: common_vendor.p({
      icon: "star",
      title: "家庭组"
    }),
    l: common_vendor.p({
      icon: "photo",
      title: "账单"
    }),
    m: common_vendor.o(($event) => $options.iconsSetting()),
    n: common_vendor.p({
      icon: "coupon",
      title: "图标"
    }),
    o: common_vendor.p({
      icon: "heart",
      title: "关注"
    }),
    p: $data.isLogin
  }, $data.isLogin ? {
    q: common_vendor.o($options.outLogin),
    r: common_vendor.p({
      icon: "man-delete-fill",
      title: "退出登录"
    })
  } : {}, {
    s: common_vendor.p({
      icon: "setting",
      title: "设置"
    }),
    t: common_vendor.p({
      selected: 4
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/index.js.map
