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
    common_vendor.index.__f__("log", "at pages/my/index.vue:67", common_vendor.index.getStorageSync("userInfo"), "---====userInfo");
    if (common_vendor.index.getStorageSync("token")) {
      this.isLogin = true;
      if (common_vendor.index.getStorageSync("userInfo")) {
        let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
        common_vendor.index.__f__("log", "at pages/my/index.vue:72", userInfo, "-----userInfo");
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
      common_vendor.index.__f__("log", "at pages/my/index.vue:123", common_vendor.index.getStorageSync("token"), "--->");
      common_vendor.index.__f__("log", "at pages/my/index.vue:124", e, "-----<<<<");
      const loginRes = await common_vendor.index.login({
        provider: "weixin"
      });
      common_vendor.index.__f__("log", "at pages/my/index.vue:129", loginRes);
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
        common_vendor.index.__f__("log", "at pages/my/index.vue:143", loginRes2);
        common_vendor.index.__f__("log", "at pages/my/index.vue:145", e.detail);
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
        common_vendor.index.__f__("error", "at pages/my/index.vue:170", "获取手机号失败", err);
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
    b: $data.isLogin
  }, $data.isLogin ? {
    c: common_vendor.t($data.userName ? $data.userName : "lumino用户"),
    d: common_vendor.t($data.phone_number ? $data.phone_number : "-")
  } : {}, {
    e: $data.isLogin
  }, $data.isLogin ? {
    f: common_vendor.o($options.updateUser),
    g: common_vendor.p({
      name: "arrow-right",
      color: "#fff",
      size: "28"
    })
  } : {}, {
    h: !$data.isLogin ? 1 : "",
    i: !$data.isLogin
  }, !$data.isLogin ? {
    j: common_vendor.o((...args) => $options.login && $options.login(...args))
  } : {}, {
    k: $data.isLogin
  }, $data.isLogin ? {
    l: common_vendor.p({
      border: false,
      icon: "star",
      title: "家庭组"
    }),
    m: common_vendor.p({
      border: false,
      icon: "photo",
      title: "账单"
    }),
    n: common_vendor.o(($event) => $options.iconsSetting()),
    o: common_vendor.p({
      border: false,
      icon: "coupon",
      title: "图标"
    }),
    p: common_vendor.p({
      border: false,
      icon: "heart",
      title: "关注"
    }),
    q: common_vendor.p({
      border: false
    })
  } : {}, {
    r: $data.isLogin
  }, $data.isLogin ? {
    s: common_vendor.o($options.outLogin),
    t: common_vendor.p({
      border: false,
      icon: "man-delete-fill",
      title: "退出登录"
    }),
    v: common_vendor.p({
      border: false,
      icon: "setting",
      title: "设置"
    }),
    w: common_vendor.p({
      border: false
    })
  } : {}, {
    x: !$data.isLogin ? 1 : "",
    y: $data.isLogin
  }, $data.isLogin ? {
    z: common_vendor.p({
      selected: 4
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/index.js.map
