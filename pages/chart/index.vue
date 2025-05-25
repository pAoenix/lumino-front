<template>
  <view class="charts">
    <view class="custom-navbar" :style="{ paddigTop: `50px` }">
      <view class="nav-content">
        <view
          class="nav-title"
          @click="tabChange(2)"
          :class="{ navActive: payType == 2 }"
        >
          支出
        </view>
        <view
          class="nav-title"
          @click="tabChange(1)"
          :class="{ navActive: payType == 1 }"
        >
          收入
        </view>
      </view>
    </view>
    <view class="container_header">
      <!-- <text>默认账本</text> -->
      <up-dropdown class="account_book" border-radius="8">
        <up-dropdown-item
          v-model="account_book_id"
          :title="accountBookName"
          @change="accountChange"
          :options="accountBookList"
        >
        </up-dropdown-item>
      </up-dropdown>
      <up-avatar-group
        class="account_book_user"
        :urls="accountBookUserUrls"
        size="30"
        gap="0.4"
      ></up-avatar-group>
    </view>
    <view class="chart_box">
      <view class="total_warpper">
        <view class="chart_total">
          {{ payType == 1 ? "总收入" : "总支出" }}：
          <text>{{ total_amount }}</text>
        </view>
        <view class="chart_total">
          平均值：
          <text>{{ average_amount }}</text>
        </view>
      </view>
      <view class="charts_box">
        <QiunDataCharts
          class="charts_warpper"
          type="line"
          :opts="opts"
          :chartData="chartData"
        />
      </view>
      <view class="Ranking">
        <view class="Ranking_title">{{
          payType == 1 ? "收入排行榜" : "支出排行榜"
        }}</view>
        <view class="Ranking_warpper">
          <view
            class="Ranking_fow"
            v-for="(item, index) in category_chart"
            :key="index"
          >
            <up-avatar
              :src="item.icon_url ? item.icon_url : pic"
              size="30"
              style="border: 2px solid #60fbed"
            ></up-avatar>
            <div class="line_progress">
              <view class="data">
                <view class="iconName">{{ item.iconName }}</view>
                <view class="newPercent">{{ item.newPercent }}%</view>
                <view class="amount">{{ item.amount }}</view>
              </view>
              <up-line-progress
                :percentage="item.newPercent"
                :activeColor="payType == 1 ? '#fef614' : '#55c9c9'"
              ></up-line-progress>
            </div>
          </view>
        </view>
      </view>
    </view>
    <CustomTabbar :selected="1"></CustomTabbar>
  </view>
</template>

<script>
import SvgIcon from "../component/svg-icon.vue"; // 引入svg
import CustomTabbar from "@/pages/component/custom-tabbar.vue";
import QiunDataCharts from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";
import { toQueryString } from "@/utils";
export default {
  components: {
    SvgIcon,
    CustomTabbar,
    QiunDataCharts,
  },
  data() {
    return {
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['radar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#55c9c9"],
        padding: [5, 5, 0, 5],
        dataLabel: false,
        enableScroll: false,
        legend: {
          show: true,
          position: "top",
          lineHeight: 25,
        },
        yAxis: {
          show: false,
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow",
          },
        },
      },
      account_book_id: "",
      accountBookName: "",
      payType: 2,
      accountBookList: [],
      accountBookUserUrls: [],
      total_amount: 0,
      average_amount: 0,
      category_chart: [],
      date_chart: [],
      IconDatas: [],
    };
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

    getApp()
      .iconInfoData()
      .then(() => {
        getApp()
          .userInfoData()
          .then((rea) => {
            getApp()
              .accountBookData(0)
              .then((res) => {
                this.IconDatas = getApp().globalData.iconData;
                const accounts = getApp().globalData.accountBookList;
                const activeAccounts =
                  getApp().globalData.activeAccountBookList;
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
                  this.account_book_id = activeAccounts.id;
                  this.accountBookName = activeAccounts.name;
                  this.accountBookUserUrls = activeAccounts.user_ids.map(
                    (item) =>
                      users.find((items) => items.id == item)?.icon_url ||
                      userInfo?.icon_url
                  );
                  this.getServerAPI();
                } else {
                  // 默认选中账本
                  this.account_book_id = accounts[0].id;
                  this.accountBookName = accounts[0].name;
                  this.accountBookUserUrls = accounts[0].user_ids.map(
                    (item) =>
                      users.find((items) => items.id == item)?.icon_url ||
                      userInfo?.icon_url
                  );
                  this.getServerAPI();
                }
                getApp().globalData.activeAccountBookList = null;
              })
              .catch((err) => {});
          });
      });
  },
  onReady() {},
  methods: {
    tabChange(type) {
      this.payType = type;
      this.opts.color = type == 1 ? ["#fef614"] : ["#55c9c9"];
      this.getServerAPI();
    },
    getServerAPI() {
      let userInfo = uni.getStorageSync("userInfo")
        ? JSON.parse(uni.getStorageSync("userInfo"))
        : null;
      uni.request({
        url: `${this.$baseURL}/api/v1/chart?account_book_id=${this.account_book_id}&type=${this.payType}&user_id=${userInfo.id}`,
        method: "GET",
        success: (res) => {
          this.total_amount = res.data.total_amount;
          this.average_amount = res.data.average_amount;
          if (res?.data?.category_chart?.length) {
            res.data.category_chart.forEach((item) => {
              let icon = this.IconDatas.find(
                (tem) => tem.id == item.category_id
              );
              console.log(icon);

              item.icon_url = icon ? icon.icon_url : "";
              item.iconName = icon ? icon.name : "";
              item.newPercent = item.percent
                ? Number(Number(item.percent * 100).toFixed(3))
                : 0;
            });
            console.log(res.data.category_chart);

            this.category_chart = res.data.category_chart;
          }
          if (res?.data?.date_chart?.length) {
            this.date_chart = res.data.date_chart;
          }
          this.getServerData();
        },
        fail: (err) => {
          console.log(err, "---err");
        },
      });
    },
    accountChange(item) {
      let userInfo = uni.getStorageSync("userInfo")
        ? JSON.parse(uni.getStorageSync("userInfo"))
        : null;
      this.account_book_id = item;
      let data = this.accountBookList.find((items) => items.id == item);
      this.accountBookName = data.label;
      if (getApp().globalData.userList?.length) {
        this.accountBookUserUrls = data.user_ids.map((tem) =>
          this.userList?.length
            ? this.userList.find((items) => items.id == tem)?.icon_url ||
              userInfo?.icon_url
            : userInfo?.icon_url
        );
        this.getServerAPI();
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
            this.getServerAPI();
          })
          .catch((err) => {
            this.userList = [];
          });
      }
    },
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: this.date_chart.map((item) =>
            new Date(item.date_str).getDate()
          ),
          series: [
            {
              name: this.payType == 1 ? "收入" : "支出",
              data: this.date_chart.map((item) => ({
                value: item.amount,
                transactions: item.transactions,
              })),
            },
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  },
};
</script>


<style lang="scss">
page {
  width: 100%;
  height: 100%;
}
.charts {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .chart_box {
    flex: 1;
    overflow: auto;
    padding-bottom: 20px;
    .total_warpper {
      display: flex;
      flex-direction: column;
      padding: 5px 10px;
      .chart_total {
        font-size: 11px;
        text {
          color: #999;
        }
      }
    }
  }
  .charts_box {
    padding: 0 10px 10px;
    height: 200px;
  }
  .Ranking {
    padding: 20px 10px;
    .Ranking_title {
      font-weight: bold;
      font-size: 15px;
      height: 30px;
      line-height: 30px;
    }
    .Ranking_warpper {
      .Ranking_fow {
        display: flex;
        align-items: center;
        position: relative;
        padding: 10px;
        gap: 20px;
        justify-content: space-between;
        .line_progress {
          width: calc(100% - 50px);
          .data {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 5px;
            .iconName {
              font-weight: bold;
              font-size: 13px;
            }
            .newPercent {
              font-size: 11px;
              color: #999;
            }
            .amount {
              margin-left: auto;
              font-size: 11px;
            }
          }
        }
      }
    }
  }
  .charts_warpper {
    width: 100%;
    height: 100%;
  }
  .container_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 10px 10px;
    box-sizing: border-box;
    box-shadow: 0 0 3px #eee;
    flex: 0;
    .account_book_user {
      position: absolute;
      top: 50%;
      right: 10px;
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
              font-size: 16px !important;
              font-weight: bold;
            }

            .u-dropdown__menu__item__arrow {
              .uni-text {
                font-size: 16px !important;
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

  .custom-navbar {
    width: 100%;
    background-color: #55c9c9;
    flex: 0;

    .nav-content {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 50px;
      .nav-title {
        color: #444;
        font-size: 17px;
        height: 100%;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .navActive {
        position: relative;
        font-weight: bold;
        &::after {
          position: absolute;
          content: "";
          display: block;
          width: 30px;
          height: 2px;
          background: #444;
          bottom: 1px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>