<template>
  <view class="icons_wapper">
    <view class="icon_warpper">
      <view
        class="icon_for"
        @click="iconSecelt(item)"
        v-for="(item, index) in iconData"
        :key="index"
      >
        <up-avatar
          class="icon_svg"
          :src="item.icon_url ? item.icon_url : pic"
          size="50"
        ></up-avatar>
        <text class="icon_text">{{ item.name }}</text>
      </view>
    </view>
    <view class="bill_footer">
      <view class="bill_submit" @click="close()"> 返回 </view>
      <view class="bill_submit" @click="submit()"> 新增 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pic: "/static/logo.png",
      iconData: [],
      isIcon: null,
    };
  },
  onShow: function () {
    this.isIcon = getApp().globalData.icons;
    getApp()
      .iconInfoData()
      .then((result) => {
        this.iconData = result;
      })
      .catch((err) => {
        this.iconData = [];
      });
  },
  methods: {
    submit() {
      uni.navigateTo({
        url: "/pages/my/add-icon",
      });
    },
    close() {
      if (this.isIcon == 1) {
        uni.navigateTo({
          url: `/pages/account/add-bill`,
        });
      } else if (this.isIcon == 2) {
        uni.navigateTo({
          url: `/pages/index/add-transaction`,
        });
      } else {
        uni.switchTab({
          url: `/pages/my/index`,
        });
      }
      getApp().globalData.icons = null;
    },
  },
};
</script>


<style lang="scss">
.icons_wapper {
  padding-bottom: env(safe - area - inset - bottom);
  .icon_warpper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    grid-gap: 23px 45px;
    justify-items: center;
    // #ifdef MP-WEIXIN
    padding: 20px 20px calc(80px + env(safe - area - inset - bottom));
    // #endif
    // #ifndef MP-WEIXIN
    padding: 20px 20px 80px;
    // #endif
    box-sizing: border-box;

    .icon_for {
      width: 50px;
      display: grid;

      &:deep(.svg-icon) {
        background: #eee;
        padding: 10px;
        border-radius: 50%;
        box-sizing: border-box;
      }

      .icon_text {
        display: block;
        width: 100%;
        margin-top: 5px;
        font-size: 14px;
        color: #333;
        text-align: center;
        height: 18px;
        line-height: 18px;
      }
    }

    .isActive {
      &:deep(.svg-icon) {
        background: #55c9c9;
      }

      .icon_text {
        color: #55c9c9;
      }
    }
  }
}
.bill_footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  box-shadow: 0 0 10px #aaa;
  box-sizing: border-box;
  // #ifdef MP-WEIXIN
  padding: 10px 20px calc(0px + env(safe - area - inset - bottom));
  // #endif
  // #ifndef MP-WEIXIN
  padding: 10px 20px;
  // #endif
  display: flex;
  gap: 10px;

  .bill_dele {
    background: #e72221;
    color: #fff;
    width: 100%;
    height: 50px;
    text-align: center;
    border-radius: 5px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
  }

  .bill_submit {
    width: 100%;
    background: #55c9c9;
    color: #fff;
    height: 50px;
    text-align: center;
    border-radius: 5px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
