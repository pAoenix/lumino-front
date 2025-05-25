"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      is_active: false,
      name: "",
      phone_number: "",
      icon_file: [],
      is_type: false
    };
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at pages/my/login.vue:46", common_vendor.index.getStorageSync("userInfo"));
    if (common_vendor.index.getStorageSync("userInfo")) {
      let userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
      this.is_type = true;
      this.is_active = true;
      this.name = userInfo.name;
      this.phone_number = userInfo.phone_number;
      this.icon_file = [{
        name: `${userInfo.name}-用户头像`,
        size: 79797,
        thumb: userInfo.icon_url,
        type: "image",
        url: userInfo.icon_url
      }];
    }
  },
  onLoad() {
  },
  mounted() {
  },
  methods: {
    async afterRead(event) {
      const file = event.file;
      this.icon_file = [{
        ...file[0],
        // 如果后续你还要上传
        name: this.name ? `${this.name}-用户头像` : file.name,
        type: "image"
      }];
    },
    deletePic(event) {
      this.icon_file = [];
    },
    getUserData(id) {
      getApp();
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: `${this.$baseURL}/api/v1/user?id=${id}`,
          method: "GET",
          success: (res) => {
            resolve(res.data);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    submit() {
      var _a, _b;
      if (this.is_type) {
        common_vendor.index.showToast({
          title: "暂未开通修改",
          icon: "none"
        });
        common_vendor.index.switchTab({
          url: `/pages/my/index`
        });
        return;
      }
      if (!this.is_active) {
        if (!this.phone_number) {
          common_vendor.index.showToast({
            title: "请填写手机号",
            icon: "none"
          });
          return;
        }
        common_vendor.index.request({
          url: `${this.$baseURL}/api/v1/user?phone_number=${this.phone_number}`,
          method: "GET",
          success: (res) => {
            var _a2, _b2, _c, _d, _e, _f;
            if (((_a2 = res.data) == null ? void 0 : _a2.message) && ((_b2 = res.data) == null ? void 0 : _b2.message) == "用户不存在") {
              common_vendor.index.showToast({
                title: "用户不存在，请完成注册",
                icon: "none"
              });
              this.is_active = true;
            } else if (((_c = res.data) == null ? void 0 : _c.message) && ((_d = res.data) == null ? void 0 : _d.message) != "用户不存在") {
              common_vendor.index.showToast({
                title: "请输入正确手机格式",
                icon: "none"
              });
            } else {
              common_vendor.index.setStorageSync("token", this.phone_number);
              common_vendor.index.setStorageSync("userInfo", JSON.stringify(res.data));
              common_vendor.index.setStorageSync("userName", res.data.name);
              common_vendor.index.setStorageSync("phone_number", this.phone_number);
              if ((_f = (_e = res.data) == null ? void 0 : _e.friend) == null ? void 0 : _f.length) {
                const promiseList = res.data.friend.map(
                  (id) => this.getUserData(id)
                );
                Promise.all(promiseList).then((results) => {
                  common_vendor.index.__f__("log", "at pages/my/login.vue:138", "所有用户数据：", results);
                  getApp().globalData.userList = results;
                  common_vendor.index.switchTab({
                    url: `/pages/my/index`
                  });
                }).catch((err) => {
                  getApp().globalData.userList = [];
                  common_vendor.index.__f__("error", "at pages/my/login.vue:146", "有请求失败了", err);
                });
              } else {
                common_vendor.index.switchTab({
                  url: `/pages/my/index`
                });
              }
            }
          },
          fail: (err) => {
            common_vendor.index.showToast({
              title: JSON.stringify(err),
              icon: "none"
            });
          }
        });
      } else {
        common_vendor.index.__f__("log", "at pages/my/login.vue:163", this.phone_number, this.name, this.icon_file);
        if (!this.phone_number || !this.name || !this.icon_file.length) {
          common_vendor.index.showToast({
            title: "请完整填写用户信息和上传头像",
            icon: "none"
          });
          return;
        }
        common_vendor.index.uploadFile({
          url: `${this.$baseURL}/api/v1/user`,
          filePath: ((_a = this.icon_file[0]) == null ? void 0 : _a.tempFilePath) || ((_b = this.icon_file[0]) == null ? void 0 : _b.url),
          // 小程序中是 tempFilePath
          name: "icon_file",
          // 接口接收 file 的字段名
          formData: {
            phone_number: this.phone_number,
            name: this.name
          },
          success: (res) => {
            var _a2;
            if ((_a2 = res.data) == null ? void 0 : _a2.message) {
              common_vendor.index.showToast({
                title: res.data.message,
                icon: "none"
              });
            } else {
              let newData = JSON.parse(res.data);
              common_vendor.index.request({
                url: `${this.$baseURL}/api/v1/user?id=${newData.id}`,
                method: "GET",
                success: (rea) => {
                  var _a3, _b2, _c, _d;
                  if (((_a3 = rea.data) == null ? void 0 : _a3.message) && ((_b2 = rea.data) == null ? void 0 : _b2.message) == "用户不存在") {
                    common_vendor.index.showToast({
                      title: "用户不存在，请完成注册",
                      icon: "none"
                    });
                    this.is_active = true;
                  } else if (((_c = rea.data) == null ? void 0 : _c.message) && ((_d = rea.data) == null ? void 0 : _d.message) != "用户不存在") {
                    common_vendor.index.showToast({
                      title: "请输入正确手机格式",
                      icon: "none"
                    });
                  } else {
                    common_vendor.index.setStorageSync("token", this.phone_number);
                    common_vendor.index.setStorageSync("userInfo", JSON.stringify(rea.data));
                    common_vendor.index.setStorageSync("userName", this.name);
                    common_vendor.index.setStorageSync("phone_number", this.phone_number);
                    common_vendor.index.switchTab({
                      url: `/pages/my/index`
                    });
                  }
                },
                fail: (err) => {
                  common_vendor.index.showToast({
                    title: JSON.stringify(err),
                    icon: "none"
                  });
                }
              });
            }
          },
          fail: (err) => {
            common_vendor.index.showToast({
              title: JSON.stringify(err),
              icon: "none"
            });
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_cell2 = common_vendor.resolveComponent("up-cell");
  const _easycom_up_upload2 = common_vendor.resolveComponent("up-upload");
  const _easycom_up_cell_group2 = common_vendor.resolveComponent("up-cell-group");
  (_easycom_up_input2 + _easycom_up_cell2 + _easycom_up_upload2 + _easycom_up_cell_group2)();
}
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_upload = () => "../../uni_modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_up_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_up_input + _easycom_up_cell + _easycom_up_upload + _easycom_up_cell_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.phone_number = $event),
    b: common_vendor.p({
      placeholder: "请输入内容",
      clearable: true,
      border: "surround",
      modelValue: $data.phone_number
    }),
    c: common_vendor.p({
      title: "手机号"
    }),
    d: $data.is_active
  }, $data.is_active ? {
    e: common_vendor.o(($event) => $data.name = $event),
    f: common_vendor.p({
      placeholder: "请输入内容",
      clearable: true,
      border: "surround",
      modelValue: $data.name
    }),
    g: common_vendor.p({
      title: "用户名"
    })
  } : {}, {
    h: $data.is_active
  }, $data.is_active ? {
    i: common_vendor.o($options.afterRead),
    j: common_vendor.o($options.deletePic),
    k: common_vendor.p({
      fileList: $data.icon_file,
      name: "用户头像",
      multiple: true,
      maxCount: 1,
      previewFullImage: true
    }),
    l: common_vendor.p({
      title: "用户头像"
    })
  } : {}, {
    m: $data.is_active && !$data.is_type
  }, $data.is_active && !$data.is_type ? {
    n: common_vendor.o(($event) => $data.is_active = false)
  } : {}, {
    o: common_vendor.t($data.is_type ? "修改" : $data.is_active ? "注册" : "登录"),
    p: common_vendor.o(($event) => $options.submit()),
    q: common_vendor.gei(_ctx, "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/login.js.map
