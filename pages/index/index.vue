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
        <view class="account_title">
          <span>{{ account.Date }}</span>
          <view class="title_total">
            <span>支出：¥{{ account.Spending }}</span>
            <span>收入：¥{{ account.Income }}</span>
          </view>
        </view>
        <up-swipe-action class="account_table">
          <up-swipe-action-item
            @click="(props) => conutClick(props, item, index)"
            :options="options"
            v-for="(item, index) in account.Items"
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
                size="40"
                style="border: 3px solid #60fbed"
              ></up-avatar>
              <view class="for_warpper">
                <view class="type"
                  >{{
                    ["", "支出", "收入", "转账", "预交款"][item.type]
                  }}：<text>{{ item.iconName }}</text>
                </view>
                <text
                  >{{ item.userName
                  }}{{
                    ["", "支出", "收入", "转账", "预交款"][item.type]
                  }}</text
                >
              </view>
              <view class="amount">
                ¥{{ Number(item.amount).toFixed(2) }}
              </view>
            </view>
          </up-swipe-action-item>
        </up-swipe-action>
      </view>
    </view>
    <!-- <view class="bottom_icon">
			<img class="icon_img" src="/static/addHL.png" alt="" />
		</view> -->
  </view>
  <CustomTabbar :selected="2" @change="tabberChange"></CustomTabbar>
</template>

<script>
import SvgIcon from "../component/svg-icon.vue"; // 引入svg
import CustomTabbar from "@/pages/component/custom-tabbar.vue";
import { getTransaction } from "@/utils/api";
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
    };
  },
  onLoad() {
    // this.getTransactionData(); // 页面加载时请求数据
  },
  onShow: function () {
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
                (item) => users.find((items) => items.id == item)?.icon_url
              );
            } else {
              // 默认选中账本
              this.accountBook = accounts[0];
              this.accountBookId = accounts[0].id;
              this.accountBookName = accounts[0].name;
              this.accountBookUser = accounts[0].user_ids;
              this.accountBookUserUrls = accounts[0].user_ids.map(
                (item) => users.find((items) => items.id == item)?.icon_url
              );
            }
            this.getTransactionData();
          })
          .catch((err) => {});
      });
  },
  methods: {
    getTransactionData() {
      let userInfo = uni.getStorageSync("userInfo")
        ? JSON.parse(uni.getStorageSync("userInfo"))
        : null;
      uni.request({
        url: `${this.$baseURL}/api/v1/transaction?account_book_id=${this.accountBookId}`,
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
    tabberChange() {
      getApp().globalData.accountBookData = {
        accountBook: this.accountBook,
        accountBookId: this.accountBookId,
        accountBookName: this.accountBookName,
        accountBookUser: this.accountBookUser,
        accountBookUserUrls: this.accountBookUserUrls,
      };
      uni.navigateTo({
        url: "/pages/account/add-count",
      });
    },
    accountChange(item) {
      this.accountBookId = item;
      let data = this.accountBookList.find((items) => items.id == item);
      this.accountBook = data;
      this.accountBookName = data.label;
      this.accountBookUser = data.user_ids;
      if (getApp().globalData.userList?.length) {
        this.accountBookUserUrls = data.user_ids.map((tem) =>
          this.userList?.length
            ? this.userList.find((items) => items.id == tem)?.icon_url || ""
            : ""
        );
        console.log(this.accountBookUserUrls);
        this.getTransactionData();
      } else {
        getApp()
          .userInfoData()
          .then((res) => {
            console.log(
              getApp().globalData.userList,
              "--getApp().globalData.userList"
            );

            this.userList = getApp().globalData.userList;
            this.accountBookUserUrls = data.user_ids.map((tem) =>
              this.userList?.length
                ? this.userList.find((items) => items.id == tem).icon_url
                : ""
            );
            console.log(this.accountBookUserUrls);

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
          data: { id: item.id },
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
            console.log(err);
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
        getApp().globalData.billCount = {
          ...item,
          amount: item.amount,
          type: item.type,
          accountBook: this.accountBook,
          accountBookId: this.accountBookId,
          accountBookName: this.accountBookName,
          accountBookUser: this.accountBookUser,
          accountBookUserUrls: this.accountBookUserUrls,
        };
        uni.navigateTo({
          url: `/pages/account/add-bill`,
        });
        // uni.navigateTo({
        // 	url: "/pages/account/account-details"
        // });
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
      margin-bottom: 10px;

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
      font-size: 13px;
      padding: 3px 10px;
      background: #f0f0f0;
      box-sizing: border-box;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title_total {
        display: flex;
        gap: 10px;
      }
    }

    .account_table {
      padding: 10px;
      display: flex;
      // gap: 10px;
      flex-direction: column;

      &:deep(.u-swipe-action-item) {
        // box-shadow: 0 0 10px #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
      }

      &:deep(.u-swipe-action-item__right) {
        top: 1px;
        bottom: 1px;
        right: 1px;
      }

      .account_for {
        width: 100%;
        padding: 20px 10px;
        box-sizing: border-box;
        display: flex;
        gap: 20px;
        align-items: center;

        &:deep(.svg-icon) {
          box-sizing: border-box;
          padding: 8px;
          border-radius: 50%;
          background: #eeeeee;
        }

        .for_img {
          width: 40px;
          height: 40px;
        }

        .for_warpper {
          text {
            display: block;
            font-size: 12px;
            color: #999;
          }

          .type {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #999;

            text {
              display: block;
              font-size: 16px;
              color: #333;
            }
          }
        }

        .amount {
          font-size: 20px;
          color: #1e9813;
          margin-left: auto;
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