<template>
  <view class="add-bill">
    <view class="bill_details" v-if="billData">
      <view class="bill_type">
        {{ ["", "收入", "支出", "转账", "预交款"][billData.type] }}
      </view>
      <view class="bill_warpper">
        <view class="bill_amount">
          ¥ {{ Number(billData.amount).toFixed(2) }}
        </view>
        <view class="bill_date"> 今天 </view>
      </view>
    </view>
    <view class="bill_details">
      <view class="bill_warpper" @click="show = true">
        <text class="bill_label">支出账户</text>
        <text class="bill_text">{{ selectAccountName }}</text>
      </view>
      <up-picker
        :closeOnClickOverlay="true"
        :show="show"
        :columns="accountTypeOptions"
        @confirm="confirmAcconut"
        @cancel="close"
        @close="close"
        keyName="label"
      ></up-picker>
    </view>
    <view class="bill_details">
      <view class="bill_warpper" @click="selectParticipants">
        <text class="bill_label">参与人</text>
        <view class="bill_text">
          共 {{ accountUserUrls.length }} 人<up-avatar-group
            class="account_book_user"
            :urls="accountUserUrls"
            size="35"
            gap="0.4"
          ></up-avatar-group>
        </view>
      </view>
    </view>
    <view class="bill_details">
      <view class="bill_warpper">
        <text class="bill_label">备注</text>
      </view>
      <up-textarea
        autoHeight
        v-model="description"
        placeholder="请输入内容"
      ></up-textarea>
    </view>
    <view class="icon_warpper">
      <view
        class="icon_for"
        @click="iconSecelt(item)"
        :class="{ isActive: iconActive == item.id }"
        v-for="(item, index) in iconData"
        :key="index"
      >
        <!-- <SvgIcon
          class="icon_svg"
          width="50px"
          height="50px"
          :name="iconActive == item.icon ? `${item.icon}-hover` : item.icon"
        /> -->
        <up-avatar
          class="icon_svg"
          :src="item.icon_url ? item.icon_url : pic"
          size="50"
        ></up-avatar>
        <text class="icon_text">{{ item.name }}</text>
      </view>
    </view>
    <view class="invite-friends" @click="addIcons()">
      <up-icon
        name="plus-circle"
        color="#55c9c9"
        size="28"
        style="margin-right: 10px"
      ></up-icon>
      新增图标
    </view>
    <view class="bill_footer">
      <view class="bill_submit" @click="submit()"> 确认 </view>
    </view>
  </view>
</template>

<script>
import SvgIcon from "../component/svg-icon.vue"; // 引入svg
import { formatDate } from "@/utils/setting-time";
export default {
  data() {
    return {
      pic: "/static/logo.png",
      billData: null,
      billUpdateData: null,
      iconData: [],
      iconActive: "",
      textActive: "",
      show: false,
      accountBookOptions: [],
      selectAccountId: "1",
      selectAccountName: "现金",
      accountTypeOptions: [],
      accountUser: [],
      accountUserUrls: [],
      description: "",
    };
  },
  components: {
    SvgIcon,
  },
  onShow: function () {
    // 图标数据
    // const IconData = getApp().globalData.iconArray;
    const IconData = getApp().globalData.iconData;
    this.iconData = IconData;
    // 页面传递数据
    const data = getApp().globalData.billCount;
    console.log(data, "----billCount");
    if (data?.iconId) {
      this.iconActive = data.iconId;
    }
    if (data?.text) {
      this.textActive = data.text;
    }
    if (data?.accountId) {
      this.selectAccountId = data.accountId;
    }
    if (data?.accountName) {
      this.selectAccountName = data.accountName;
    }
    this.billData = data;
    // 账本信息
    const accounts = getApp().globalData.accountBookList;
    // 账户信息
    const accountType = getApp().globalData.accountType;
    console.log(accountType);
    this.accountTypeOptions = [accountType];
    if (!data.accountId) {
      this.selectAccountId = accountType[0].id;
      this.selectAccountName = accountType[0].label;
    }
    // 人员信息
    const users = getApp().globalData.userList;
    let userInfo = JSON.parse(uni.getStorageSync("userInfo"));
    this.accountUser = [userInfo.id];
    this.accountUserUrls = [userInfo.icon_url];
    // 编辑数据
    const updata = getApp().globalData.updateAcconutData;
    if (updata) {
      this.iconActive = updata.iconId;
      this.textActive = updata.text;
      this.selectAccountId = updata.accountId;
      this.selectAccountName = updata.accountName;
      this.billData = updata;
    }
    console.log(updata, "----updateAcconutData");
    this.billUpdateData = updata;
    // 选择的参与人
    const selectUserList = getApp().globalData.selectUserList;
    console.log(selectUserList);
    if (selectUserList) {
      this.accountUser = selectUserList.accountUser;
      this.accountUserUrls = selectUserList.accountUserUrls;
    }
  },
  methods: {
    iconSecelt(item) {
      const data = getApp().globalData.billCount;
      const updata = getApp().globalData.updateAcconutData;
      getApp().globalData.billCount = {
        ...data,
        iconId: item.id,
        text: item.name,
      };
      this.iconActive = item.id;
      this.textActive = item.name;
      if (!updata) return;
      getApp().globalData.updateAcconutData = {
        ...updata,
        iconId: item.id,
        text: item.name,
      };
    },
    addIcons() {
      getApp().globalData.icons = 1;
      uni.navigateTo({
        url: "/pages/my/icons",
      });
    },
    confirmAcconut(item) {
      const data = getApp().globalData.billCount;
      const updata = getApp().globalData.updateAcconutData;
      getApp().globalData.billCount = {
        ...data,
        accountId: item.value[0].id,
        accountName: item.value[0].label,
      };
      this.selectAccountId = item.value[0].id;
      this.selectAccountName = item.value[0].label;
      this.show = false;
      if (!updata) return;
      getApp().globalData.updateAcconutData = {
        ...updata,
        accountId: item.value[0].id,
        accountName: item.value[0].label,
      };
    },
    close() {
      this.show = false;
    },
    selectParticipants() {
      getApp().globalData.participantsData = {
        ...this.billData,
        accountUser: this.accountUser,
      };
      uni.navigateTo({
        url: `/pages/account/participants`,
      });
    },
    submit() {
      let userInfo = JSON.parse(uni.getStorageSync("userInfo"));
      let data = {
        id: this.billUpdateData ? this.billUpdateData.id : undefined,
        amount: Number(this.billData.amount),
        account_book_id: Number(this.billData.accountBookId),
        category_id: this.iconActive,
        date: formatDate(new Date()),
        creator_id: userInfo.id,
        pay_user_id: userInfo.id,
        related_user_ids: this.accountUser,
        type: this.billData.type,
        description: this.description,
      };
      console.log(data);
      uni.request({
        url: `${this.$baseURL}/api/v1/transaction`,
        method: this.billUpdateData ? "PUT" : "POST",
        data: data,
        success: (res) => {
          if (res.data?.message && res.data?.message) {
            uni.showToast({
              title: res.data?.message
                ? res.data?.message
                : this.billUpdateData
                ? "修改交易失败"
                : "创建交易失败",
              icon: "none",
            });
          } else {
            uni.showToast({
              title: this.billUpdateData ? "修改交易成功" : "创建交易成功",
            });
            // 清除数据，避免下次读取错误
            getApp().globalData.billCount = null;
            getApp().globalData.updateAcconutData = null;
            uni.switchTab({
              url: `/pages/index/index`,
            });
          }
        },
        fail: (err) => {
          console.log(err);
          uni.showToast({
            title: this.billUpdateData ? "修改交易失败" : "创建交易失败",
            icon: "none",
          });
        },
      });
      //   // 在源页面存储数据
      //   getApp().globalData.selectBillData = {
      //     ...this.billData,
      //     accountId: this.selectAccountId,
      //     accountName: this.selectAccountName,
      //     icon: this.iconActive,
      //     text: this.textActive,
      //     accountUser: this.accountUser,
      //     update: this.billUpdateData ? 1 : 0,
      //   };
    },
  },
};
</script>

<style scoped lang="scss">
.add-bill {
  width: 100%;
  position: relative;

  .bill_details {
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 5px solid #eee;

    .bill_type {
      font-size: 16px;
      color: #999;
    }

    .bill_warpper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      margin-top: 10px;

      .bill_amount {
        color: #55c9c9;
        font-size: 30px;
        font-weight: bold;
      }

      .bill_label {
        color: #999;
      }

      .bill_text {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #333;
      }
    }
  }

  .icon_warpper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    grid-gap: 23px 45px;
    padding: 20px;
    justify-items: center;
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
  .invite-friends {
    // #ifdef MP-WEIXIN
    padding: 20px 20px calc(80px + env(safe - area - inset - bottom));
    // #endif
    // #ifndef MP-WEIXIN
    padding: 20px 20px 80px;
    // #endif
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

    .bill_submit {
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
}
</style>