"use strict";
const common_vendor = require("../../common/vendor.js");
const CustomTabbar = () => "../component/custom-tabbar.js";
const _sfc_main = {
  components: {
    CustomTabbar
  },
  data() {
    return {
      commentList: [],
      current: 0,
      list: [
        {
          name: "全部",
          count: 12
        },
        {
          name: "攒钱心德",
          count: 12
        },
        {
          name: "家庭",
          count: 12
        },
        {
          name: "朋友",
          count: 12
        },
        {
          name: "我的关注",
          count: 12
        }
      ]
    };
  },
  onLoad() {
    this.getComment();
  },
  onShow: function() {
    if (!common_vendor.index.getStorageSync("token")) {
      common_vendor.index.switchTab({
        url: `/pages/my/index`
      });
      return;
    }
  },
  methods: {
    // 跳转到全部回复
    toAllReply() {
      common_vendor.index.navigateTo({
        url: "/pages/find/reply"
      });
    },
    // 点赞
    getLike(index) {
      this.commentList[index].isLike = !this.commentList[index].isLike;
      if (this.commentList[index].isLike == true) {
        this.commentList[index].likeNum++;
      } else {
        this.commentList[index].likeNum--;
      }
    },
    tabChange(val) {
      common_vendor.index.__f__("log", "at pages/find/index.vue:103", val);
    },
    // 评论列表
    getComment() {
      this.commentList = [
        {
          id: 1,
          name: "馨香香",
          date: "12-25 18:58",
          contentText: "我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的",
          url: "http://snrqtn2an.hd-bkt.clouddn.com/account/user10.png",
          allReply: 12,
          likeNum: 33,
          isLike: false,
          replyList: [
            {
              name: "uview",
              contentStr: "uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！"
            },
            {
              name: "粘粘",
              contentStr: "今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多"
            }
          ]
        },
        {
          id: 2,
          name: "杨汶宗",
          date: "01-25 13:58",
          contentText: "我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的",
          allReply: 0,
          likeNum: 11,
          isLike: false,
          url: "http://snrqtn2an.hd-bkt.clouddn.com/account/user2.png"
        },
        {
          id: 3,
          name: "杨宗易",
          date: "03-25 13:58",
          contentText: "我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的",
          allReply: 0,
          likeNum: 21,
          isLike: false,
          allReply: 2,
          url: "http://snrqtn2an.hd-bkt.clouddn.com/account/user1.png",
          replyList: [
            {
              name: "龙省江",
              contentStr: "uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！"
            },
            {
              name: "豆包",
              contentStr: "想吃冰糖葫芦粘豆包，但没钱5555........."
            }
          ]
        },
        {
          id: 4,
          name: "阿瑞克",
          date: "06-20 13:58",
          contentText: "我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的",
          url: "http://snrqtn2an.hd-bkt.clouddn.com/account/user9.png",
          allReply: 0,
          likeNum: 150,
          isLike: false
        }
      ];
    }
  }
};
if (!Array) {
  const _easycom_up_tabs2 = common_vendor.resolveComponent("up-tabs");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_easycom_up_tabs2 + _easycom_up_icon2 + _component_CustomTabbar)();
}
const _easycom_up_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_tabs + _easycom_up_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("tabs", "6b9c9bec-0"),
    b: common_vendor.o($options.tabChange),
    c: common_vendor.p({
      activeColor: "#55c9c9",
      list: $data.list,
      current: $data.current,
      ["is-scroll"]: false,
      swiperWidth: "750"
    }),
    d: common_vendor.f($data.commentList, (res, index, i0) => {
      return common_vendor.e({
        a: res.url,
        b: common_vendor.t(res.name),
        c: common_vendor.t(res.likeNum),
        d: !res.isLike
      }, !res.isLike ? {
        e: common_vendor.o(($event) => $options.getLike(index), res.id),
        f: "6b9c9bec-1-" + i0,
        g: common_vendor.p({
          name: "thumb-up",
          size: 30,
          color: "#9a9a9a"
        })
      } : {}, {
        h: res.isLike
      }, res.isLike ? {
        i: common_vendor.o(($event) => $options.getLike(index), res.id),
        j: "6b9c9bec-2-" + i0,
        k: common_vendor.p({
          name: "thumb-up-fill",
          size: 30
        })
      } : {}, {
        l: res.isLike ? 1 : "",
        m: common_vendor.t(res.contentText),
        n: common_vendor.f(res.replyList, (item, index2, i1) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.contentStr),
            c: index2
          };
        }),
        o: res.replyList != void 0
      }, res.replyList != void 0 ? {
        p: common_vendor.t(res.allReply),
        q: "6b9c9bec-3-" + i0,
        r: common_vendor.p({
          name: "arrow-right",
          size: 26
        }),
        s: common_vendor.o((...args) => $options.toAllReply && $options.toAllReply(...args), res.id)
      } : {}, {
        t: common_vendor.t(res.date),
        v: res.id
      });
    }),
    e: common_vendor.p({
      selected: 3
    }),
    f: common_vendor.gei(_ctx, "")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6b9c9bec"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/find/index.js.map
