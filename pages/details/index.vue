<template>
  <view class="account_book">
    <view class="account_book_warpper">
      <up-sticky class="sticky_text" offset-top="10">
        <view
          style="
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          "
          @click="addAccountBook()"
        >
          <up-icon
            name="plus-circle-fill"
            color="#55c9c9"
            size="20px"
          ></up-icon>
          新建账本
        </view>
      </up-sticky>
      <view class="filter">
        <view class="filter_warpper">
          <view
            class="u-page__tag-item"
            v-for="(item, index) in radios"
            :key="index"
          >
            <up-tag
              :class="{ 'u-tag-active': item.checked }"
              :text="item.text"
              :plain="!item.checked"
              shape="circle"
              :name="index"
              @click="radioClick(index)"
              :icon="
                !item.checked ? '/static/sort.png' : '/static/sort-active.png'
              "
            >
            </up-tag>
          </view>
        </view>
        <view class="counts"
          ><img
            class="counts_img"
            src="/static/sort.png"
            alt=""
          />跨账本统计</view
        >
      </view>
      <view class="account_book_table">
        <view
          class="table_for"
          v-for="(item, index) in accountList"
          :key="index"
        >
          <view class="table_title">{{ setTime(item.created_at) }} 创建</view>
          <view class="table_warpper">
            <view class="table_header" @click="toAccountPage(item)">
              <text>{{ item.name }}</text>
              <up-icon name="arrow-right"></up-icon>
            </view>
            <up-avatar-group
              class="avatar_warpper"
              :maxCount="7"
              :urls="getUserImg(item)"
              size="40"
              gap="0"
            ></up-avatar-group>
            <up-divider class="up-divider" :dot="true"></up-divider>
            <view class="table_foot">
              <view class="foot_but" @click="updateAccountBook(item)">
                <view class="but1">
                  <up-icon name="setting" color="#55c9c9"></up-icon>
                  设置
                </view>
              </view>
              <view class="foot_but" @click="toAccountPageChart(item)">
                <view class="but2">
                  <up-icon name="grid" color="#55c9c9"></up-icon>
                  图表
                </view>
              </view>
            </view>
            <up-divider class="up-divider" :dot="false"></up-divider>
            <view class="table_foot">
              <view class="amount"
                >收入 ¥<text class="amount_text">{{ item.income }}</text>
                元</view
              >
              <view class="amount"
                >支出 ¥<text class="amount_text">{{ item.spending }}</text>
                元</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
    <CustomTabbar :selected="0"></CustomTabbar>
  </view>
</template>

<script>
import CustomTabbar from "@/pages/component/custom-tabbar.vue";
import { formatTimes } from "@/utils/setting-time";
export default {
  components: {
    CustomTabbar,
  },
  data() {
    return {
      userList: [],
      tagActive: 1,
      accountList: [],
      radios: [
        {
          checked: true,
          text: "热度",
        },
        {
          checked: false,
          text: "时间",
        },
      ],
    };
  },
  onShow: async function () {
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
        console.log(rea);
        getApp()
          .accountBookData(0)
          .then((res) => {
            const accounts = getApp().globalData.accountBookList;
            const users = getApp().globalData.userList;
            this.userList = users;
            this.accountList = accounts;
          })
          .catch((err) => {
            console.log(err);
            this.userList = [];
            this.accountList = [];
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  onLoad() {},
  mounted() {},
  methods: {
    setTime(time) {
      if (time) {
        return formatTimes(time);
      } else {
        return "";
      }
    },
    getImg(id) {
      let userInfo = uni.getStorageSync("userInfo")
        ? JSON.parse(uni.getStorageSync("userInfo"))
        : null;
      if (this.userList?.length) {
        let data = this.userList.find((item) => item.id == id);
        if (data) {
          return data.icon_url;
        } else {
          return userInfo?.icon_url || "";
        }
      } else {
        return userInfo?.icon_url || "";
      }
    },
    getUserImg(item) {
      if (item.user_ids?.length) {
        return item.user_ids.map((items) => this.getImg(items));
      } else {
        return [];
      }
    },
    radioClick(name) {
      this.radios.forEach((item, index) => {
        item.checked = index === name;
      });
    },
    toAccountPage(item) {
      getApp().globalData.activeAccountBookList = item;
      uni.switchTab({
        url: `/pages/index/index`,
      });
    },
    toAccountPageChart(item) {
      getApp().globalData.activeAccountBookList = item;
      uni.switchTab({
        url: `/pages/chart/index`,
      });
    },
    updateAccountBook(item) {
      getApp().globalData.updateAccountBook = item;
      uni.navigateTo({
        url: "/pages/account/add-account-book",
      });
    },
    addAccountBook() {
      uni.navigateTo({
        url: "/pages/account/add-account-book",
      });
    },
  },
};
</script>


<style lang="scss">
.account_book {
  padding: 20px;
  // #ifdef MP-WEIXIN
  padding-bottom: calc(80px + env(safe - area - inset - bottom));
  // #endif
  // #ifndef MP-WEIXIN
  padding-bottom: 80px;

  // #endif
  .account_book_warpper {
    .sticky_text {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      box-shadow: 0 0 10px #f0f0f0;
      text-align: center;
      background: #fff !important;
    }

    .filter {
      display: flex;
      gap: 10px;
      // #ifdef MP-WEIXIN
      margin-top: 20px;
      // #endif
      // #ifndef MP-WEIXIN
      margin-top: 60px;
      // #endif
      align-items: center;
      justify-content: space-between;

      .filter_warpper {
        display: flex;
        gap: 10px;

        &:deep(.u-tag) {
          border-color: #55c9c9;

          .u-tag__text {
            color: #55c9c9;
          }
        }

        .u-tag-active {
          &:deep(.u-tag--primary) {
            background-color: #55c9c9;
            border-color: #55c9c9;

            .u-tag__text {
              color: #ffffff;
            }
          }
        }
      }

      .counts {
        display: flex;

        .counts_img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }
    }
  }

  .account_book_table {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-top: 20px;

    .table_for {
      .table_title {
        text-align: right;
        color: #aaa;
        font-size: 13px;
        height: 30px;
        line-height: 30px;
      }

      .avatar_warpper {
        box-sizing: border-box;
        padding: 10px 20px;
      }

      .up-divider {
        margin: 5px 0 5px;
      }

      .table_warpper {
        box-shadow: 0 0 10px #f0f0f0;

        .table_header {
          display: flex;
          height: 60px;
          box-sizing: border-box;
          padding: 0 20px;
          align-items: center;
          justify-content: space-between;

          .text {
            font-size: 22px;
          }
        }

        .table_foot {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;

          .foot_but {
            display: flex;
            width: 50%;
            height: 30px;
            align-items: center;
            justify-content: center;

            .but1,
            .but2 {
              display: flex;
              font-size: 14px;
              align-items: center;
              gap: 5px;
              color: #333;
            }
          }

          .amount {
            padding: 0 20px;
            font-size: 14px;
            color: #333;
            height: 30px;
            line-height: 30px;
            padding-bottom: 10px;
            display: inline-flex;
            font-size: 12px;

            .amount_text {
              font-size: 14px;
              font-weight: bold;
              color: #55c9c9;
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>