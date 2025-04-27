<template>
  <view class="my">
    <view class="my_warpper u-cell-group">
      <view class="u-m-r-30">
        <up-avatar
          :src="userFile ? userFile : pic"
          size="120"
          style="border: 3px solid #60fbed"
        ></up-avatar>
      </view>
      <button v-if="!isLogin" @click="login">手机号登录</button>
      <view class="u-flex-1" v-if="isLogin">
        <view class="u-font-18 u-p-b-20 u-tips-color">{{
          userName ? userName : "lumino用户"
        }}</view>
        <view class="u-font-14 u-tips-color"
          >手机号:{{ phone_number ? phone_number : "-" }}</view
        >
      </view>
      <view class="u-m-l-a u-p-10" v-if="isLogin">
        <!-- <up-icon
          style="margin-right: 10px"
          name="scan"
          color="#fff"
          size="28"
        ></up-icon> -->
        <up-icon
          @click="updateUser"
          name="arrow-right"
          color="#fff"
          size="28"
        ></up-icon>
      </view>
    </view>

    <view class="u-m-t-20">
      <up-cell-group>
        <up-cell icon="rmb-circle" title="支付"></up-cell>
      </up-cell-group>
    </view>

    <view class="u-m-t-20">
      <up-cell-group>
        <up-cell icon="star" title="家庭组"></up-cell>
        <up-cell icon="photo" title="账单"></up-cell>
        <up-cell icon="coupon" title="图标" @click="iconsSetting()"></up-cell>
        <up-cell icon="heart" title="关注"></up-cell>
      </up-cell-group>
    </view>

    <view class="u-m-t-20">
      <up-cell-group>
        <up-cell
          v-if="isLogin"
          icon="man-delete-fill"
          title="退出登录"
          @click="outLogin"
        ></up-cell>
        <up-cell icon="setting" title="设置"></up-cell>
      </up-cell-group>
    </view>
  </view>
  <CustomTabbar :selected="4" />
</template>

<script>
import CustomTabbar from "@/pages/component/custom-tabbar.vue";
import { getUserInfo } from "@/utils/api";
export default {
  components: {
    CustomTabbar,
  },
  data() {
    return {
      pic: "/static/logo.png",
      show: true,
      isLogin: false,
      userName: "",
      userFile: "",
      phone_number: "",
    };
  },
  onShow: function () {
    if (uni.getStorageSync("token")) {
      this.isLogin = true;
      if (uni.getStorageSync("userInfo")) {
        let userInfo = JSON.parse(uni.getStorageSync("userInfo"));
        console.log(userInfo, "-----userInfo");
        this.userFile = userInfo.icon_url;
      } else {
        this.userFile = null;
      }
      if (uni.getStorageSync("userName")) {
        this.userName = uni.getStorageSync("userName");
      } else {
        this.userName = "";
      }
      if (uni.getStorageSync("phone_number")) {
        this.phone_number = uni.getStorageSync("phone_number");
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
  onLoad() {},
  mounted() {},
  methods: {
    iconsSetting() {
      uni.navigateTo({
        url: "/pages/my/icons",
      });
    },
    async login() {
      uni.navigateTo({
        url: "/pages/my/login",
      });
    },
    updateUser() {
      uni.navigateTo({
        url: "/pages/my/login",
      });
    },
    outLogin() {
      uni.setStorageSync("token", "");
      uni.setStorageSync("userInfo", "");
      uni.setStorageSync("userName", "");
      uni.setStorageSync("phone_number", "");
      this.isLogin = false;
      this.userName = "";
      this.userFile = null;
      this.phone_number = "";
    },
    async onGetPhoneNumber(e) {
      console.log(uni.getStorageSync("token"), "--->");
      console.log(e, "-----<<<<");
      // 先调用 login 获取 code
      const loginRes = await uni.login({
        provider: "weixin",
      });
      console.log(loginRes);
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        uni.showToast({
          title: "用户取消授权",
          icon: "none",
        });
        return;
      }
      try {
        // 先调用 login 获取 code
        const loginRes = await uni.login({
          provider: "weixin",
        });
        const code = loginRes.code;
        console.log(loginRes);

        console.log(e.detail);
        return;
        // 发送到后端解密手机号
        const res = await uni.request({
          url: "https://your-server.com/api/wxPhoneLogin",
          method: "POST",
          data: {
            code,
            encryptedData,
            iv,
          },
        });

        if (res.data.code === 200) {
          // uni.setStorageSync('token', res.data.data.token)
          uni.showToast({
            title: "登录成功",
          });
        } else {
          uni.showToast({
            title: "登录失败",
            icon: "none",
          });
        }
      } catch (err) {
        console.error("获取手机号失败", err);
        uni.showToast({
          title: "异常",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.my {
  padding-bottom: calc(60px + env(safe - area - inset - bottom));

  .my_warpper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 30px 10px 30px 30px;
    box-sizing: border-box;
    background: #55c9c9;
  }
}

page {
  background-color: #ededed;
}

.u-m-r-30 {
  margin-right: 30px;
}

.u-m-t-20 {
  margin-bottom: 20px;
}

.u-font-18 {
  font-size: 18px;
}

.u-font-14 {
  font-size: 14px;
}

.u-p-b-20 {
  padding-bottom: 20px;
  box-sizing: border-box;
}

.u-tips-color {
  color: #fff;
}

.u-m-l-a {
  margin-left: auto;
  display: flex;
}

.u-p-10 {
  box-sizing: border-box;
  padding: 10px;
}

.camera {
  width: 54px;
  height: 44px;

  &:active {
    background-color: #ededed;
  }
}

.user-box {
  background-color: #fff;
}

.u-cell-group {
  background-color: #fff;
}
</style>