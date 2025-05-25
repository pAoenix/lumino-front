<template>
  <view class="container">
    <view class="account_warpper">
      <view class="container_header">
        <!-- <text>默认账本</text> -->
        <up-dropdown class="account_book" border-radius="8">
          <up-dropdown-item
            v-model="accountBookId"
            :title="accountBookName"
            @change="accountChange"
            :options="accountBookList"
          >
          </up-dropdown-item>
        </up-dropdown>
        <up-avatar-group
          class="account_book_user"
          :urls="accountBookUserUrls"
          size="35"
          gap="0.4"
        ></up-avatar-group>
      </view>
      <swiper class="swiper_warpper" :autoplay="true" :interval="3000">
        <swiper-item
          class="swiper_warpper_item"
          v-for="(item, index) in account_warpper"
          :key="index"
        >
          <!-- 这里自定义 view 内容 -->
          <view class="left-content">
            <text class="count">{{ item.amount }}</text>
            <text class="type">{{ item.type }}</text>
          </view>
          <view class="right-content">
            <text class="counts">{{ item.amounts }}</text>
            <text class="text">我的结余（¥）</text>
          </view>
          <view class="title">{{ item.name }}</view>
        </swiper-item>
      </swiper>
      <view v-for="(account, ind) in accountList" :key="ind">
        <view
          class="account_title"
          :class="{ account_title_noborder: ind === 0 }"
        >
          <span>{{ account.Date }}</span>
          <view class="title_total">
            <span class="title_span">
              <text class="title_text">支出：</text>{{ account.Spending }}
            </span>
            <span class="title_span">
              <text class="title_text">收入：</text>{{ account.Income }}
            </span>
          </view>
        </view>
        <up-swipe-action class="account_table">
          <up-swipe-action-item
            @click="(props) => conutClick(props, item, index)"
            :options="options"
            v-for="(item, index) in account.Items"
            :class="{ noBorder: index === account.Items.length - 1 }"
            :key="index"
          >
            <view class="account_for">
              <!-- <SvgIcon
                width="40px"
                height="40px"
                :name="`${item.icon_url}-hover`"
              /> -->
              <up-avatar
                :src="item.icon_url ? item.icon_url : pic"
                size="30"
                style="border: 2px solid #60fbed"
              ></up-avatar>
              <view class="for_warpper">
                <view class="type">
                  <!-- {{ ["", "收入", "支出", "转账", "预交款"][item.type] }}： -->
                  <text>{{ item.iconName }}</text>
                </view>
                <text class="userName">
                  <text class="name">{{ item.userName }}</text>
                  <text class="name_type">{{
                    ["", "收入", "支出", "转账", "预交款"][item.type]
                  }}</text
                  >,
                  <text class="users"
                    >参与人
                    <text class="users_number">{{
                      item.related_user_ids.length
                    }}</text>
                    人</text
                  >
                </text>
              </view>
              <view class="amount" :class="{ income: item.type == 1 }">
                <text v-if="item.type == 1">+</text>
                <text v-if="item.type == 2">-</text>
                <text>{{ Number(Number(item.amount).toFixed(2)) }}</text>
              </view>
              <view class="date">{{ setTime(item.date) }}</view>
            </view>
          </up-swipe-action-item>
        </up-swipe-action>
      </view>
    </view>
    <!-- <view class="bottom_icon">
			<img class="icon_img" src="/static/addHL.png" alt="" />
		</view> -->
    <CustomTabbar
      :selected="2"
      @change="tabberChange"
      @tabPage="tabPage"
    ></CustomTabbar>
  </view>
</template>

<script>
import SvgIcon from "../component/svg-icon.vue"; // 引入svg
import CustomTabbar from "@/pages/component/custom-tabbar.vue";
import { getTransaction } from "@/utils/api";
import { formatTimes1, formatDateToCustomString } from "@/utils/setting-time";
export default {
  components: {
    SvgIcon,
    CustomTabbar,
  },
  data() {
    return {
      pic: "/static/logo.png",
      show: false,
      accountBookId: "",
      accountBookName: "",
      accountBook: null,
      accountBookList: [],
      accountBookUser: [],
      accountBookUserUrls: [],
      userList: [],
      accountList: [],
      options: [
        {
          text: "编辑",
          style: {
            backgroundColor: "#3c9cff",
          },
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#f56c6c",
          },
        },
      ],
      account_warpper: [],
      openedIndex: null,
    };
  },
  onLoad() {
    // this.getTransactionData(); // 页面加载时请求数据
  },
  onShow: function () {
    let userInfo = uni.getStorageSync("userInfo")
      ? JSON.parse(uni.getStorageSync("userInfo"))
      : null;
    if (!uni.getStorageSync("token")) {
      uni.switchTab({
        url: `/pages/my/index`,
      });
      return;
    }
    getApp().iconInfoData();
    getApp()
      .userInfoData()
      .then((rea) => {
        getApp()
          .accountBookData(0)
          .then((res) => {
            const accounts = getApp().globalData.accountBookList;
            const activeAccounts = getApp().globalData.activeAccountBookList;
            const users = getApp().globalData.userList;
            this.userList = users;
            this.accountBookList = accounts.map((item) => {
              return {
                ...item,
                label: item.name,
                value: item.id,
              };
            });
            // 带入账本
            if (activeAccounts) {
              this.accountBook = activeAccounts;
              this.accountBookId = activeAccounts.id;
              this.accountBookName = activeAccounts.name;
              this.accountBookUser = activeAccounts.user_ids;
              this.accountBookUserUrls = activeAccounts.user_ids.map(
                (item) =>
                  users.find((items) => items.id == item)?.icon_url ||
                  userInfo?.icon_url
              );
            } else {
              // 默认选中账本
              this.accountBook = accounts[0];
              this.accountBookId = accounts[0].id;
              this.accountBookName = accounts[0].name;
              this.accountBookUser = accounts[0].user_ids;
              this.accountBookUserUrls = accounts[0].user_ids.map(
                (item) =>
                  users.find((items) => items.id == item)?.icon_url ||
                  userInfo?.icon_url
              );
            }
            this.getTransactionData();
            getApp().globalData.activeAccountBookList = null;
          })
          .catch((err) => {});
      });
  },
  methods: {
    setTime(time) {
      if (time) {
        return formatDateToCustomString(formatTimes1(time));
      } else {
        return "-";
      }
    },
    getTransactionData() {
      let userInfo = uni.getStorageSync("userInfo")
        ? JSON.parse(uni.getStorageSync("userInfo"))
        : null;
      uni.request({
        url: `${this.$baseURL}/api/v1/transaction?account_book_id=${this.accountBookId}&user_id=${userInfo.id}`,
        method: "GET",
        success: (res) => {
          let newData = [];
          if (res.data?.transactions?.length) {
            res.data?.transactions.forEach((item) => {
              if (item.Items?.length) {
                item.Items.forEach((items) => {
                  let icon = res.data.categorys.find(
                    (tem) => tem.id == items.category_id
                  );
                  let userData = res.data.users.find(
                    (tem) => tem.id == items.pay_user_id
                  );
                  items.icon_url = icon ? icon.icon_url : "";
                  items.iconName = icon ? icon.name : "";
                  items.userName = userData ? userData.name : "";
                });
              }
            });
            let Spendings = res.data?.transactions.reduce(
              (sum, item) => sum + item.Spending,
              0
            );
            let Incomes = res.data?.transactions.reduce(
              (sum, item) => sum + item.Income,
              0
            );
            newData.push(
              {
                amount: Number(Number(Spendings).toFixed(2)),
                amounts: userInfo.balance,
                type: "账单支出（¥）",
                name: `总支出 ¥:${Number(Number(Spendings).toFixed(2))} 元`,
              },
              {
                amount: Number(Number(Incomes).toFixed(2)),
                amounts: userInfo.balance,
                type: "账单收入（¥）",
                name: `总收入 ¥:${Number(Number(Incomes).toFixed(2))} 元`,
              }
            );
            this.account_warpper = newData;
            if (res.data?.transactions?.length) {
              res.data.transactions.forEach((item) => {
                if (item.Items?.length) {
                  item.Items.sort((a, b) => {
                    return (
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                  });
                }
              });
              res.data.transactions.sort((a, b) => {
                return new Date(b.Date).getTime() - new Date(a.Date).getTime();
              });
            }
            this.accountList = res.data?.transactions;
          } else {
            this.account_warpper = [];
            this.accountList = [];
          }
        },
        fail: (err) => {
          this.accountList = [];
        },
      });
    },
    tabPage(url) {
      if (url !== "/pages/index/index") {
        this.accountBookId = "";
        this.accountBookName = "";
        this.account_warpper = [];
        this.accountList = [];
        this.accountBookUserUrls = [];
      }
    },
    tabberChange() {
      getApp().globalData.accountBookData = {
        accountBook: this.accountBook,
        accountBookId: this.accountBookId,
        accountBookName: this.accountBookName,
        accountBookUser: this.accountBookUser,
        accountBookUserUrls: this.accountBookUserUrls,
      };
      //   uni.navigateTo({
      //     url: "/pages/account/add-count",
      //   });
      uni.navigateTo({
        url: "/pages/index/add-transaction",
      });
    },
    accountChange(item) {
      let userInfo = uni.getStorageSync("userInfo")
        ? JSON.parse(uni.getStorageSync("userInfo"))
        : null;
      this.accountBookId = item;
      let data = this.accountBookList.find((items) => items.id == item);
      this.accountBook = data;
      this.accountBookName = data.label;
      this.accountBookUser = data.user_ids;
      if (getApp().globalData.userList?.length) {
        this.accountBookUserUrls = data.user_ids.map((tem) =>
          this.userList?.length
            ? this.userList.find((items) => items.id == tem)?.icon_url ||
              userInfo?.icon_url
            : userInfo?.icon_url
        );
        this.getTransactionData();
      } else {
        getApp()
          .userInfoData()
          .then((res) => {
            this.userList = getApp().globalData.userList;
            this.accountBookUserUrls = data.user_ids.map((tem) =>
              this.userList?.length
                ? this.userList.find((items) => items.id == tem)?.icon_url ||
                  userInfo?.icon_url
                : userInfo?.icon_url
            );
            this.getTransactionData();
          })
          .catch((err) => {
            this.userList = [];
          });
      }
    },
    conutClick(props, item, index) {
      if (props.index == 1) {
        // 删除
        // this.accountList.splice(index, 1);
        uni.request({
          url: `${this.$baseURL}/api/v1/transaction`,
          method: "DELETE",
          data: {
            id: item.id,
          },
          success: (res) => {
            if (res.data?.message && res.data?.message) {
              uni.showToast({
                title: res.data?.message ? res.data?.message : "删除失败",
                icon: "none",
              });
            } else {
              uni.showToast({
                title: "删除成功",
              });
              this.getTransactionData();
            }
          },
          fail: (err) => {
            uni.showToast({
              title: "删除失败",
              icon: "none",
            });
          },
        });
      } else {
        // 在源页面存储数据
        getApp().globalData.updateAcconutData = {
          ...item,
          accountBook: this.accountBook,
          accountBookId: this.accountBookId,
          accountBookName: this.accountBookName,
          accountBookUser: this.accountBookUser,
          accountBookUserUrls: this.accountBookUserUrls,
        };
        // 在源页面存储数据
        getApp().globalData.accountBookData = {
          ...item,
          amount: item.amount,
          type: item.type,
          accountBook: this.accountBook,
          accountBookId: this.accountBookId,
          accountBookName: this.accountBookName,
          accountBookUser: this.accountBookUser,
          accountBookUserUrls: this.accountBookUserUrls,
        };
        // uni.navigateTo({
        //   url: `/pages/account/add-bill`,
        // });
        uni.navigateTo({
          url: "/pages/index/add-transaction",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.container {
  // #ifdef MP-WEIXIN
  padding-bottom: calc(60px + env(safe - area - inset - bottom));
  // #endif
  // #ifndef MP-WEIXIN
  padding-bottom: 60px;
  // #endif

  .account_warpper {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    .container_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      position: relative;

      .account_book_user {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
      }

      .account_book {
        &:deep(.u-dropdown__menu) {
          .u-dropdown__menu__item {
            justify-content: flex-start;

            .u-flex-row {
              display: flex;
              align-items: center;

              .u-dropdown__menu__item__text {
                font-size: 20px !important;
                font-weight: bold;
              }

              .u-dropdown__menu__item__arrow {
                .uni-text {
                  font-size: 20px !important;
                  font-weight: bold;
                }
              }
            }
          }
        }

        &:deep(.u-dropdown__content) {
          .u-cell__title-text {
            font-size: 16px !important;
            font-weight: 500;
          }
        }
      }

      text {
        font-size: 22px;
        font-weight: bold;
      }
    }

    .swiper_warpper {
      height: 120px;
      //   margin-bottom: 10px;

      .swiper_warpper_item {
        padding: 0 20px 20px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        background: linear-gradient(45deg, #55c9c9, #24f4eb);
        border-radius: 10px;
        position: relative;

        .title {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30px;
          line-height: 30px;
          background-color: #00000047;
          color: #fff;
          font-size: 12px;
          text-align: center;
        }

        text {
          display: block;
          color: #fff;
        }

        .count {
          font-size: 30px;
          font-weight: bold;
        }

        .counts {
          font-size: 20px;
        }

        .type,
        .text {
          font-size: 13px;
        }
      }
    }

    .account_title {
      width: 100%;
      font-size: 11px;
      padding: 10px 10px 0px;
      border-top: 1px solid #f0f0f0;
      box-sizing: border-box;
      color: #aaa;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      .title_total {
        display: flex;
        gap: 10px;
        font-size: 11px;
        .title_span {
          font-size: 12px;
        }
        .title_text {
          font-weight: 400;
          font-size: 11px;
          color: #888;
        }
      }
    }
    .account_title_noborder {
      margin-top: 0;
      border-top: none;
    }

    .account_table {
      padding: 0 0 0 10px;
      display: flex;
      // gap: 10px;
      flex-direction: column;

      &:deep(.u-swipe-action-item) {
        border-bottom: 1px solid #f5f5f5a1;
      }
      .noBorder {
        border-bottom: none;
      }
      &:deep(.u-swipe-action-item__right) {
        top: 1px;
        bottom: 1px;
        right: 1px;
      }

      .account_for {
        width: 100%;
        padding: 10px 10px 10px 0;
        box-sizing: border-box;
        display: flex;
        gap: 15px;
        align-items: center;
        position: relative;

        &:deep(.svg-icon) {
          box-sizing: border-box;
          padding: 8px;
          border-radius: 50%;
          background: #eeeeee;
        }

        .for_img {
          width: 30px;
          height: 30px;
        }

        .for_warpper {
          .userName {
            display: flex;
            align-items: center;
            gap: 3px;
            font-size: 11px;
            color: #aaa;
            .name {
              font-weight: bold;
              color: #666;
              margin-right: 3px;
            }
            .name_type {
              color: #666;
              margin-right: 3px;
            }
            .users {
              color: #666;
              .users_number {
                font-weight: bold;
              }
            }
          }

          .type {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #999;

            text {
              display: block;
              font-size: 14px;
              color: #333;
            }
          }
        }

        .amount {
          font-size: 15px;
          color: #333;
          margin-left: auto;
          margin-bottom: 15px;
        }
        .income {
          color: #feb414;
        }
        .date {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 10px;
          color: #666;
        }
      }
    }
  }
}

.bottom_icon {
  position: fixed;
  bottom: env(safe - area - inset - bottom);
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  z-index: 9999999999;
  border-top: 1px solid #f0f0f0;
  border-bottom: none;
  border-radius: 50%;
  background: #fff;
  padding: 10px;

  .icon_img {
    width: 100%;
    height: 100%;
  }
}
</style>