"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pic: "/static/logo.png",
      name: "",
      icon_file: []
    };
  },
  onShow: function() {
  },
  methods: {
    async afterRead(event) {
      const file = event.file;
      this.icon_file = [
        {
          ...file[0],
          // 如果后续你还要上传
          name: this.name ? `${this.name}-图标` : file.name,
          type: "image"
        }
      ];
    },
    deletePic(event) {
      this.icon_file = [];
    },
    submit() {
      var _a, _b;
      let userInfo = common_vendor.index.getStorageSync("userInfo") ? JSON.parse(common_vendor.index.getStorageSync("userInfo")) : null;
      common_vendor.index.uploadFile({
        url: `${this.$baseURL}/api/v1/category`,
        filePath: ((_a = this.icon_file[0]) == null ? void 0 : _a.tempFilePath) || ((_b = this.icon_file[0]) == null ? void 0 : _b.url),
        // 小程序中是 tempFilePath
        name: "icon_file",
        // 接口接收 file 的字段名
        formData: {
          user_id: userInfo.id,
          name: this.name
        },
        success: (res) => {
          var _a2;
          common_vendor.index.__f__("log", "at pages/my/add-icon.vue:71", res, "-------res");
          if (res.statusCode == 413) {
            common_vendor.index.showToast({
              title: "上传图片过大",
              icon: "none"
            });
          } else {
            if ((_a2 = res.data) == null ? void 0 : _a2.message) {
              common_vendor.index.showToast({
                title: res.data.message,
                icon: "none"
              });
            } else {
              common_vendor.index.navigateBack({
                delta: 1
                // 返回上一级
              });
            }
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/my/add-icon.vue:94", err, "------err");
          common_vendor.index.showToast({
            title: "注册失败",
            icon: "none"
          });
        }
      });
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
  return {
    a: common_vendor.o(($event) => $data.name = $event),
    b: common_vendor.p({
      placeholder: "请输入内容",
      clearable: true,
      border: "surround",
      modelValue: $data.name
    }),
    c: common_vendor.p({
      title: "图标名称"
    }),
    d: common_vendor.o($options.afterRead),
    e: common_vendor.o($options.deletePic),
    f: common_vendor.p({
      fileList: $data.icon_file,
      name: "图标",
      multiple: true,
      maxCount: 1,
      previewFullImage: true
    }),
    g: common_vendor.p({
      title: "图标"
    }),
    h: common_vendor.o(($event) => $options.submit()),
    i: common_vendor.gei(_ctx, "")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/add-icon.js.map
