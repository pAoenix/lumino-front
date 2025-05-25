"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uUpload_utils = require("./utils.js");
const uni_modules_uviewPlus_components_uUpload_mixin = require("./mixin.js");
const uni_modules_uviewPlus_components_uUpload_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_libs_function_test = require("../../libs/function/test.js");
const _sfc_main = {
  name: "u-upload",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uUpload_mixin.mixinUpload, uni_modules_uviewPlus_components_uUpload_props.props],
  data() {
    return {
      lists: [],
      isInCount: true
    };
  },
  watch: {
    // 监听文件列表的变化，重新整理内部数据
    fileList: {
      handler() {
        this.formatFileList();
      },
      immediate: true,
      deep: true
    },
    deletable(newVal) {
      this.formatFileList();
    },
    maxCount(newVal) {
      this.formatFileList();
    },
    accept(newVal) {
      this.formatFileList();
    }
  },
  emits: ["error", "beforeRead", "oversize", "afterRead", "delete", "clickPreview"],
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    addStyle: uni_modules_uviewPlus_libs_function_index.addStyle,
    formatFileList() {
      const {
        fileList = [],
        maxCount
      } = this;
      const lists = fileList.map(
        (item) => Object.assign(Object.assign({}, item), {
          // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
          isImage: this.accept === "image" || uni_modules_uviewPlus_libs_function_test.test.image(item.url || item.thumb),
          isVideo: this.accept === "video" || uni_modules_uviewPlus_libs_function_test.test.video(item.url || item.thumb),
          deletable: typeof item.deletable === "boolean" ? item.deletable : this.deletable
        })
      );
      this.lists = lists;
      this.isInCount = lists.length < maxCount;
    },
    chooseFile() {
      const {
        maxCount,
        multiple,
        lists,
        disabled
      } = this;
      if (disabled)
        return;
      let capture;
      try {
        capture = uni_modules_uviewPlus_libs_function_test.test.array(this.capture) ? this.capture : this.capture.split(",");
      } catch (e) {
        capture = [];
      }
      uni_modules_uviewPlus_components_uUpload_utils.chooseFile(
        Object.assign({
          accept: this.accept,
          extension: this.extension,
          multiple: this.multiple,
          capture,
          compressed: this.compressed,
          maxDuration: this.maxDuration,
          sizeType: this.sizeType,
          camera: this.camera
        }, {
          maxCount: maxCount - lists.length
        })
      ).then((res) => {
        this.onBeforeRead(multiple ? res : res[0]);
      }).catch((error) => {
        this.$emit("error", error);
      });
    },
    // 文件读取之前
    onBeforeRead(file) {
      const {
        beforeRead,
        useBeforeRead
      } = this;
      let res = true;
      if (uni_modules_uviewPlus_libs_function_test.test.func(beforeRead)) {
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit(
            "beforeRead",
            Object.assign(Object.assign({
              file
            }, this.getDetail()), {
              callback: (ok) => {
                ok ? resolve() : reject();
              }
            })
          );
        });
      }
      if (!res) {
        return;
      }
      if (uni_modules_uviewPlus_libs_function_test.test.promise(res)) {
        res.then((data) => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(file);
      }
    },
    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.fileList.length : index
      };
    },
    onAfterRead(file) {
      const {
        maxSize,
        afterRead
      } = this;
      const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
      if (oversize) {
        this.$emit("oversize", Object.assign({
          file
        }, this.getDetail()));
        return;
      }
      if (typeof afterRead === "function") {
        afterRead(file, this.getDetail());
      }
      this.$emit("afterRead", Object.assign({
        file
      }, this.getDetail()));
    },
    deleteItem(index) {
      this.$emit(
        "delete",
        Object.assign(Object.assign({}, this.getDetail(index)), {
          file: this.fileList[index]
        })
      );
    },
    // 预览图片
    onPreviewImage(previewItem, index) {
      if (!previewItem.isImage || !this.previewFullImage)
        return;
      let current = 0;
      const urls = [];
      let imageIndex = 0;
      for (var i = 0; i < this.lists.length; i++) {
        const item = this.lists[i];
        if (item.isImage || item.type && item.type === "image") {
          urls.push(item.url || item.thumb);
          if (i === index) {
            current = imageIndex;
          }
          imageIndex += 1;
        }
      }
      if (urls.length < 1) {
        return;
      }
      common_vendor.index.previewImage({
        urls,
        current,
        fail() {
          uni_modules_uviewPlus_libs_function_index.toast("预览图片失败");
        }
      });
    },
    onPreviewVideo(index) {
      if (!this.previewFullImage)
        return;
      let current = 0;
      const sources = [];
      let videoIndex = 0;
      for (var i = 0; i < this.lists.length; i++) {
        const item = this.lists[i];
        if (item.isVideo || item.type && item.type === "video") {
          sources.push(Object.assign(Object.assign({}, item), {
            type: "video"
          }));
          if (i === index) {
            current = videoIndex;
          }
          videoIndex += 1;
        }
      }
      if (sources.length < 1) {
        return;
      }
      common_vendor.wx$1.previewMedia({
        sources,
        current,
        fail() {
          uni_modules_uviewPlus_libs_function_index.toast("预览视频失败");
        }
      });
    },
    onClickPreview(item, index) {
      if (!this.previewFullImage)
        return;
      switch (item.type) {
        case "video":
          this.onPreviewVideo(index);
          break;
      }
      this.$emit(
        "clickPreview",
        Object.assign(Object.assign({}, item), this.getDetail(index))
      );
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  (_easycom_u_icon2 + _easycom_u_loading_icon2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_loading_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.previewImage
  }, _ctx.previewImage ? {
    b: common_vendor.f($data.lists, (item, index, i0) => {
      return common_vendor.e({
        a: item.isImage || item.type && item.type === "image"
      }, item.isImage || item.type && item.type === "image" ? {
        b: item.thumb || item.url,
        c: _ctx.imageMode,
        d: common_vendor.o(($event) => $options.onPreviewImage(item, index), index),
        e: common_vendor.s({
          width: $options.addUnit(_ctx.width),
          height: $options.addUnit(_ctx.height)
        })
      } : {
        f: "c8491d64-0-" + i0,
        g: common_vendor.p({
          color: "#80CBF9",
          size: "26",
          name: item.isVideo || item.type && item.type === "video" ? "movie" : "folder"
        }),
        h: common_vendor.t(item.isVideo || item.type && item.type === "video" ? "视频" : "文件"),
        i: common_vendor.o(($event) => $options.onClickPreview(item, index), index)
      }, {
        j: item.status === "uploading" || item.status === "failed"
      }, item.status === "uploading" || item.status === "failed" ? common_vendor.e({
        k: item.status === "failed"
      }, item.status === "failed" ? {
        l: "c8491d64-1-" + i0,
        m: common_vendor.p({
          name: "close-circle",
          color: "#ffffff",
          size: "25"
        })
      } : {
        n: "c8491d64-2-" + i0,
        o: common_vendor.p({
          size: "22",
          mode: "circle",
          color: "#ffffff"
        })
      }, {
        p: item.message
      }, item.message ? {
        q: common_vendor.t(item.message)
      } : {}) : {}, {
        r: item.status !== "uploading" && (_ctx.deletable || item.deletable)
      }, item.status !== "uploading" && (_ctx.deletable || item.deletable) ? {
        s: "c8491d64-3-" + i0,
        t: common_vendor.p({
          name: "close",
          color: "#ffffff",
          size: "10"
        }),
        v: common_vendor.o(($event) => $options.deleteItem(index), index)
      } : {}, {
        w: item.status === "success"
      }, item.status === "success" ? {
        x: "c8491d64-4-" + i0,
        y: common_vendor.p({
          name: "checkmark",
          color: "#ffffff",
          size: "12"
        })
      } : {}, {
        z: index
      });
    })
  } : {}, {
    c: $data.isInCount
  }, $data.isInCount ? common_vendor.e({
    d: _ctx.$slots.trigger
  }, _ctx.$slots.trigger ? {
    e: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  } : !_ctx.$slots.trigger && (_ctx.$slots.default || _ctx.$slots.$default) ? {
    g: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  } : common_vendor.e({
    h: common_vendor.p({
      name: _ctx.uploadIcon,
      size: "26",
      color: _ctx.uploadIconColor
    }),
    i: _ctx.uploadText
  }, _ctx.uploadText ? {
    j: common_vendor.t(_ctx.uploadText)
  } : {}, {
    k: !_ctx.disabled ? "u-upload__button--hover" : "",
    l: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args)),
    m: common_vendor.n(_ctx.disabled && "u-upload__button--disabled"),
    n: common_vendor.s({
      width: $options.addUnit(_ctx.width),
      height: $options.addUnit(_ctx.height)
    })
  }), {
    f: !_ctx.$slots.trigger && (_ctx.$slots.default || _ctx.$slots.$default)
  }) : {}, {
    o: common_vendor.s($options.addStyle(_ctx.customStyle)),
    p: common_vendor.gei(_ctx, "")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8491d64"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-upload/u-upload.js.map
