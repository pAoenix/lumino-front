"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      accountBookName: "",
      userList: "",
      activeUser: [],
      updateData: null,
      show: false,
      Invite_phoneNumber: ""
    };
  },
  onShow: function() {
    const users = getApp().globalData.userList;
    this.userList = users;
    const data = getApp().globalData.updateAccountBook;
    common_vendor.index.__f__("log", "at pages/account/add-account-book.vue:95", data);
    this.updateData = data;
    if (this.updateData) {
      this.accountBookName = this.updateData.name;
      this.activeUser = this.updateData.user_ids;
    }
    getApp().globalData.updateAccountBook = null;
  },
  methods: {
    close() {
      this.show = false;
    },
    InviteFriends() {
      this.show = true;
    },
    inviteFriend() {
      if (!this.Invite_phoneNumber) {
        common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: `${this.$baseURL}/api/v1/user?phone_number=${this.Invite_phoneNumber}`,
        method: "GET",
        success: (res) => {
          var _a, _b;
          if (((_a = res.data) == null ? void 0 : _a.message) && ((_b = res.data) == null ? void 0 : _b.message)) {
            common_vendor.index.showToast({
              title: "用户不存在",
              icon: "none"
            });
          } else {
            let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
            common_vendor.index.request({
              url: `${this.$baseURL}/api/v1/friend/invite`,
              method: "POST",
              data: {
                invitee: res.data.id,
                // 被邀请人
                inviter: userInfo.id
                // 邀请人
              },
              success: (rea) => {
                var _a2, _b2;
                if (((_a2 = rea.data) == null ? void 0 : _a2.message) && ((_b2 = rea.data) == null ? void 0 : _b2.message)) {
                  common_vendor.index.showToast({
                    title: rea.data.message,
                    icon: "none"
                  });
                  this.show = false;
                } else {
                  getApp().userInfoData().then((res2) => {
                    const users = getApp().globalData.userList;
                    this.userList = users;
                    common_vendor.index.showToast({
                      title: "邀请成功"
                    });
                    this.show = false;
                  }).catch((err) => {
                    this.userList = [];
                    this.show = false;
                  });
                }
              },
              fail: (err) => {
                common_vendor.index.showToast({
                  title: "邀请朋友失败",
                  icon: "none"
                });
              }
            });
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "用户不存在",
            icon: "none"
          });
        }
      });
    },
    deleteAccount() {
      common_vendor.index.request({
        url: `${this.$baseURL}/api/v1/account-book`,
        method: "DELETE",
        data: {
          id: this.updateData ? this.updateData.id : void 0
        },
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          getApp().accountBookData(0).then((res2) => {
            common_vendor.index.showToast({
              title: "账本删除成功"
            });
            common_vendor.index.switchTab({
              url: `/pages/details/index`
            });
          }).catch((err) => {
            common_vendor.index.showToast({
              title: "账本删除失败",
              icon: "none"
            });
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/account/add-account-book.vue:209", err);
        }
      });
    },
    submit() {
      let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
      common_vendor.index.request({
        url: `${this.$baseURL}/api/v1/account-book`,
        method: this.updateData ? "PUT" : "POST",
        data: {
          creator_id: this.updateData ? void 0 : userInfo.id,
          id: this.updateData ? this.updateData.id : void 0,
          name: this.accountBookName,
          user_ids: this.activeUser
        },
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          var _a;
          common_vendor.index.__f__("log", "at pages/account/add-account-book.vue:231", res.data);
          if ((_a = res.data) == null ? void 0 : _a.message) {
            common_vendor.index.showToast({
              title: res.data.message,
              icon: "none"
            });
          } else {
            getApp().accountBookData(0).then((res2) => {
              common_vendor.index.showToast({
                title: this.updateData ? "账本修改成功" : "账本新建成功"
              });
              common_vendor.index.switchTab({
                url: `/pages/details/index`
              });
            }).catch((err) => {
              common_vendor.index.showToast({
                title: this.updateData ? "账本修改失败" : "账本新建失败",
                icon: "none"
              });
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/account/add-account-book.vue:257", err);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_cell2 = common_vendor.resolveComponent("up-cell");
  const _easycom_up_checkbox2 = common_vendor.resolveComponent("up-checkbox");
  const _easycom_up_checkbox_group2 = common_vendor.resolveComponent("up-checkbox-group");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_cell_group2 = common_vendor.resolveComponent("up-cell-group");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_up_input2 + _easycom_up_cell2 + _easycom_up_checkbox2 + _easycom_up_checkbox_group2 + _easycom_up_icon2 + _easycom_up_cell_group2 + _easycom_up_popup2)();
}
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_checkbox = () => "../../uni_modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_up_checkbox_group = () => "../../uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_input + _easycom_up_cell + _easycom_up_checkbox + _easycom_up_checkbox_group + _easycom_up_icon + _easycom_up_cell_group + _easycom_up_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.accountBookName = $event),
    b: common_vendor.p({
      placeholder: "请输入内容",
      clearable: true,
      border: "surround",
      modelValue: $data.accountBookName
    }),
    c: common_vendor.p({
      title: "账本名称"
    }),
    d: common_vendor.f($data.userList, (item, index, i0) => {
      return {
        a: item.icon_url,
        b: common_vendor.t(item.name),
        c: index,
        d: "5a0be122-4-" + i0 + ",5a0be122-3",
        e: common_vendor.p({
          shape: "circle",
          activeColor: "#55c9c9",
          label: item.name,
          name: item.id
        })
      };
    }),
    e: common_vendor.o(($event) => $data.activeUser = $event),
    f: common_vendor.p({
      placement: "column",
      modelValue: $data.activeUser
    }),
    g: common_vendor.p({
      name: "plus-circle",
      color: "#55c9c9",
      size: "28"
    }),
    h: common_vendor.o(($event) => $options.InviteFriends()),
    i: common_vendor.o(($event) => $data.Invite_phoneNumber = $event),
    j: common_vendor.p({
      placeholder: "请输入内容",
      clearable: true,
      border: "surround",
      modelValue: $data.Invite_phoneNumber
    }),
    k: common_vendor.p({
      title: "手机号"
    }),
    l: common_vendor.o(($event) => $options.inviteFriend()),
    m: common_vendor.o($options.close),
    n: common_vendor.p({
      show: $data.show,
      mode: "center",
      round: 4,
      closeable: true,
      customStyle: {
        width: "90%"
      }
    }),
    o: $data.updateData
  }, $data.updateData ? {
    p: common_vendor.o(($event) => $options.deleteAccount())
  } : {}, {
    q: common_vendor.o(($event) => $options.submit())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5a0be122"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/account/add-account-book.js.map
