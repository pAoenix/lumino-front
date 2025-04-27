<template>
  <view>
    <up-cell-group>
      <up-cell title="账本名称">
        <template #value>
          <up-input
            placeholder="请输入内容"
            clearable
            border="surround"
            v-model="accountBookName"
          ></up-input>
        </template>
      </up-cell>
      <view class="checkbox_user">
        <up-checkbox-group v-model="activeUser" placement="column">
          <up-checkbox
            class="participants-checkbox-group"
            v-for="(item, index) in userList"
            shape="circle"
            :key="index"
            activeColor="#55c9c9"
            :label="item.name"
            :name="item.id"
          >
            <template #label>
              <img class="check_img" :src="item.icon_url" alt="" />
              {{ item.name }}</template
            >
          </up-checkbox>
        </up-checkbox-group>
        <view class="invite-friends" @click="InviteFriends()">
          <up-icon
            name="plus-circle"
            color="#55c9c9"
            size="28"
            style="margin-right: 10px"
          ></up-icon>
          邀请朋友
        </view>
      </view>
    </up-cell-group>
    <up-popup
      :show="show"
      mode="center"
      :round="4"
      @close="close"
      :closeable="true"
      :customStyle="{ width: '90%' }"
    >
      <view class="Invite_box">
        <view class="Invite_title">邀请朋友</view>
        <view class="Invite_form">
          <up-cell-group>
            <up-cell title="手机号">
              <template #value>
                <up-input
                  placeholder="请输入内容"
                  clearable
                  border="surround"
                  v-model="Invite_phoneNumber"
                ></up-input>
              </template>
            </up-cell>
          </up-cell-group>
        </view>
        <view class="Invite_bottom" @click="inviteFriend()"> 邀请 </view>
      </view>
    </up-popup>
    <view class="bill_footer">
      <view class="bill_dele" v-if="updateData" @click="deleteAccount()">
        删除
      </view>
      <view class="bill_submit" @click="submit()"> 确认 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      accountBookName: "",
      userList: "",
      activeUser: [],
      updateData: null,
      show: false,
      Invite_phoneNumber: "",
    };
  },

  onShow: function () {
    const users = getApp().globalData.userList;
    this.userList = users;
    const data = getApp().globalData.updateAccountBook;
    console.log(data);
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
        uni.showToast({
          title: "请输入手机号",
          icon: "none",
        });
        return;
      }
      uni.request({
        url: `${this.$baseURL}/api/v1/user?phone_number=${this.Invite_phoneNumber}`,
        method: "GET",
        success: (res) => {
          if (res.data?.message && res.data?.message) {
            uni.showToast({
              title: "用户不存在",
              icon: "none",
            });
          } else {
            let userInfo = uni.getStorageSync("userInfo")
              ? JSON.parse(uni.getStorageSync("userInfo"))
              : null;
            uni.request({
              url: `${this.$baseURL}/api/v1/friend/invite`,
              method: "POST",
              data: {
                invitee: res.data.id, // 被邀请人
                inviter: userInfo.id, // 邀请人
              },
              success: (rea) => {
                if (rea.data?.message && rea.data?.message) {
                  uni.showToast({
                    title: rea.data.message,
                    icon: "none",
                  });
                  this.show = false;
                } else {
                  getApp()
                    .userInfoData()
                    .then((res) => {
                      const users = getApp().globalData.userList;
                      this.userList = users;
                      uni.showToast({
                        title: "邀请成功",
                      });
                      this.show = false;
                    })
                    .catch((err) => {
                      this.userList = [];
                      this.show = false;
                    });
                }
              },
              fail: (err) => {
                uni.showToast({
                  title: "邀请朋友失败",
                  icon: "none",
                });
              },
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: "用户不存在",
            icon: "none",
          });
        },
      });
    },
    deleteAccount() {
      // 创建账本
      uni.request({
        url: `${this.$baseURL}/api/v1/account-book`,
        method: "DELETE",
        data: {
          id: this.updateData ? this.updateData.id : undefined,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: (res) => {
          getApp()
            .accountBookData(0)
            .then((res) => {
              uni.showToast({
                title: "账本删除成功",
              });
              uni.switchTab({
                url: `/pages/details/index`,
              });
            })
            .catch((err) => {
              uni.showToast({
                title: "账本删除失败",
                icon: "none",
              });
            });
        },
        fail: (err) => {
          console.error(err);
        },
      });
    },
    submit() {
      let userInfo = uni.getStorageSync("userInfo")
        ? JSON.parse(uni.getStorageSync("userInfo"))
        : null;
      // 创建账本
      uni.request({
        url: `${this.$baseURL}/api/v1/account-book`,
        method: this.updateData ? "PUT" : "POST",
        data: {
          creator_id: this.updateData ? undefined : userInfo.id,
          id: this.updateData ? this.updateData.id : undefined,
          name: this.accountBookName,
          user_ids: this.activeUser,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: (res) => {
          console.log(res.data);
          if (res.data?.message) {
            uni.showToast({
              title: res.data.message,
              icon: "none",
            });
          } else {
            getApp()
              .accountBookData(0)
              .then((res) => {
                uni.showToast({
                  title: this.updateData ? "账本修改成功" : "账本新建成功",
                });
                uni.switchTab({
                  url: `/pages/details/index`,
                });
              })
              .catch((err) => {
                uni.showToast({
                  title: this.updateData ? "账本修改失败" : "账本新建失败",
                  icon: "none",
                });
              });
          }
        },
        fail: (err) => {
          console.error(err);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.participants-checkbox-group {
  &:deep(.u-checkbox__icon-wrap) {
    width: 22px !important;
    height: 22px !important;

    .u-icon__icon {
      font-size: 16px !important;
    }
  }

  &:deep(.u-checkbox__label-wrap) {
    display: flex;
    align-items: center;
    width: 100%;

    view {
      display: flex;
      align-items: center;
    }
  }
}

.check_img {
  width: 35px;
  height: 35px;
  margin: 0 10px;
  border-radius: 50%;
  overflow: hidden;
}

.checkbox_user {
  // #ifdef MP-WEIXIN
  padding: 10px 20px calc(80px + env(safe - area - inset - bottom));
  // #endif
  // #ifndef MP-WEIXIN
  padding: 10px 20px 80px;
  // #endif
  .invite-friends {
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.Invite_box {
  .Invite_title {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    // border-bottom: 1px solid #f0f0f0;
  }
  .Invite_form {
    padding-bottom: 20px;
  }
  .Invite_bottom {
    width: 100%;
    background: #55c9c9;
    color: #fff;
    height: 50px;
    text-align: center;
    border-radius: 0;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
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