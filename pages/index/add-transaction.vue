<template>
  <div class="add_transation">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar" :style="{ paddigTop: `${statusBarHeight}px` }">
      <view class="nav-content">
        <view
          class="nav-title"
          @click="tabChange(2)"
          :class="{ navActive: isTypeActive == 2 }"
        >
          支出
        </view>
        <view
          class="nav-title"
          @click="tabChange(1)"
          :class="{ navActive: isTypeActive == 1 }"
        >
          收入
        </view>
      </view>
    </view>
    <!-- 页面其他内容 -->
    <view class="page-body" :class="{ page_padding: iconActive }">
      <view class="icon_warpper">
        <view
          class="icon_for"
          @click="iconSecelt(item)"
          :class="{ isActive: iconActive == item.id }"
          v-for="(item, index) in IconDatas"
          :key="index"
        >
          <up-avatar
            class="icon_svg"
            :src="item.icon_url ? item.icon_url : pic"
            size="40"
          ></up-avatar>
          <text class="icon_text">{{ item.name }}</text>
        </view>
      </view>
      <view class="invite-friends">
        <view class="add_icon" @click="addIcons()">
          <up-icon
            name="plus-circle"
            color="#55c9c9"
            size="20"
            style="margin-right: 10px"
          ></up-icon>
          新增图标
        </view>
      </view>
    </view>
    <view class="keyboard_warpper" v-if="iconActive">
      <view class="players">
        <view class="players_title">参与人</view>
        <view class="players_users">
          共
          {{
            accountUserUrls && accountUserUrls.length
              ? accountUserUrls.length
              : 0
          }}
          人<up-avatar-group
            class="account_book_user"
            :urls="accountUserUrls"
            size="25"
            gap="0.4"
          ></up-avatar-group>
        </view>
      </view>
      <view class="keyboard_number">
        {{ conutNumber }}
        <view
          class="close"
          v-if="conutNumber && conutNumber != '0'"
          @click="closeNumber()"
          >清空</view
        >
      </view>
      <view class="description">
        <view class="description_warpper">
          <text class="title">备注：</text>
          <up-input
            class="description_input"
            autoHeight
            v-model="description"
            placeholder="点击填写备注"
          ></up-input>
        </view>
      </view>
      <view class="keyboard_button_warpper">
        <view
          class="keyboard_button"
          v-for="item in keyboards"
          :key="item"
          :class="{
            keyboard_nobutton: Boolean(
              ['addSubtract', 'calculation', 'done'].includes(item)
            ),
          }"
        >
          <view v-if="item == 'time'" class="button" @click="timeShow = true">
            <view v-if="setTime(timeText) == setTime(Date.now())" class="time">
              <up-icon name="calendar" size="20"></up-icon>
              <text class="text">今天</text>
            </view>
            <view v-else class="time">{{ setTime(timeText) }}</view>
          </view>
          <view
            v-else-if="item == 'icon'"
            class="button icon"
            @click="backspace()"
          >
            <up-icon name="backspace" size="25"></up-icon>
          </view>
          <view
            v-else-if="item == 'done'"
            class="button done"
            @click="returnDone()"
            >{{ returndFun() }}</view
          >
          <view v-else-if="item == 'addSubtract'" class="button buttonCal">
            <view class="icon_but" @click="calculation('+')">+</view>
            <view class="icon_but" @click="calculation('-')">-</view>
          </view>
          <view v-else-if="item == 'calculation'" class="button buttonCal">
            <view class="icon_but" @click="calculation('*')">*</view>
            <view class="icon_but" @click="calculation('/')">/</view>
          </view>
          <view v-else class="button" @click="keyChange(item)">{{ item }}</view>
        </view>
      </view>
    </view>
    <up-datetime-picker
      v-if="timeShow"
      title="选择日期"
      :show="timeShow"
      v-model="timeText"
      mode="date"
      @confirm="confirm"
      @close="close"
      @cancel="close"
    ></up-datetime-picker>
  </div>
</template>

<script>
import { formatTime, formatDateUTC } from "@/utils/setting-time";
export default {
  data() {
    return {
      billUpdateData: null,
      accountBookData: null,
      isTypeActive: 2,
      iconActive: null,
      statusBarHeight: 0,
      IconDatas: [],
      conutNumber: "0",
      description: "",
      keyboards: [
        "7",
        "8",
        "9",
        "time",
        "4",
        "5",
        "6",
        "addSubtract",
        "1",
        "2",
        "3",
        "calculation",
        ".",
        "0",
        "icon",
        "done",
      ],
      timeShow: false,
      timeText: Date.now(),
      accountBookUser: [],
      accountUserUrls: [],
    };
  },
  onLoad() {
    const sysInfo = wx.getSystemInfoSync();
    this.statusBarHeight = sysInfo.statusBarHeight;
  },
  onShow: function () {
    this.IconDatas = getApp().globalData.iconData;

    // 编辑数据
    const updata = getApp().globalData.updateAcconutData;
    if (updata) {
      this.iconActive = updata.category_id;
      this.textActive = updata.text;
      this.accountBookData = updata;
      this.billUpdateData = updata;
      this.accountBookUser = updata.accountBookUser?.length
        ? updata.accountBookUser
        : [];
      this.accountUserUrls = updata.accountBookUserUrls?.length
        ? updata.accountBookUserUrls
        : [];
      this.description = updata.description;
      this.conutNumber = `${updata.amount}`;
      this.isTypeActive = updata.type;
      this.timeText = new Date(updata.date);
    } else {
      // 页面传递数据
      const data = getApp().globalData.accountBookData;
      if (data?.iconId) {
        this.iconActive = data.category_id;
      }
      this.accountBookData = data;
      this.accountBookUser = data?.accountBookUser?.length
        ? data.accountBookUser
        : [];
      this.accountUserUrls = data?.accountBookUserUrls?.length
        ? data.accountBookUserUrls
        : [];
    }
  },
  methods: {
    setTime(time) {
      return time ? formatTime(time) : "";
    },
    tabChange(type) {
      this.isTypeActive = type;
    },
    addIcons() {
      getApp().globalData.icons = 2;
      uni.navigateTo({
        url: "/pages/my/icons",
      });
    },
    confirm(e) {
      this.timeText = e.value;
      this.timeShow = false;
    },
    close() {
      this.timeShow = false;
    },
    keyChange(key) {
      if (this.conutNumber == "0") {
        this.conutNumber = key;
      } else {
        this.conutNumber += key;
      }
    },
    calculation(key) {
      if (!this.conutNumber || this.conutNumber == "0") {
        uni.showToast({
          title: "请输入数值",
          icon: "none",
        });
      } else {
        if (/[+\-*/]/.test(this.conutNumber)) {
          this.conutNumber = `${this.calculateExpression(
            this.conutNumber
          )}${key}`;
        } else {
          this.conutNumber += key;
        }
      }
    },
    returndFun() {
      if (/^[^+\-*/]*(?:[+\-*/])?$/.test(this.conutNumber)) {
        return "完成";
      } else {
        return "=";
      }
    },
    returnDone() {
      if (/^[^+\-*/]*(?:[+\-*/])?$/.test(this.conutNumber)) {
        let userInfo = JSON.parse(uni.getStorageSync("userInfo"));
        let data = {
          id: this.billUpdateData ? this.billUpdateData.id : undefined,
          amount: Number(this.conutNumber),
          account_book_id: Number(this.accountBookData.accountBookId),
          category_id: this.iconActive,
          date: formatDateUTC(this.timeText),
          creator_id: userInfo.id,
          pay_user_id: userInfo.id,
          related_user_ids: this.accountBookUser,
          type: this.isTypeActive,
          description: this.description,
        };
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
              getApp().globalData.accountBookData = null;
              getApp().globalData.updateAcconutData = null;
              // uni.switchTab({
              //   url: `/pages/index/index`,
              // });
              uni.reLaunch({
                url: "/pages/index/index",
              });
            }
          },
          fail: (err) => {
            uni.showToast({
              title: this.billUpdateData ? "修改交易失败" : "创建交易失败",
              icon: "none",
            });
          },
        });
      } else {
        this.conutNumber = `${this.calculateExpression(this.conutNumber)}`;
      }
    },
    backspace() {
      if (
        !this.conutNumber ||
        this.conutNumber == "0" ||
        this.conutNumber.length === 1
      ) {
        this.conutNumber = "0";
      } else {
        this.conutNumber = this.conutNumber.slice(0, -1);
      }
    },
    closeNumber() {
      this.conutNumber = "0";
    },
    calculateExpression(expression) {
      // 去除表达式两端的空格
      expression = expression.trim();
      // 检查输入是否为空
      if (expression === "") {
        return 0;
      }
      // 定义运算符的优先级
      const precedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
      };
      // 定义运算符对应的操作函数
      const operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
      };

      // 使用正则表达式将字符串拆分成数字和运算符数组
      let tokens = expression.match(/\d+\.\d+|\d+|\+|\-|\*|\/|\(|\)/g) || [];

      // 检查最后一个字符是否为运算符，如果是，则去掉该运算符
      if (/[\+\-\*\/]$/.test(expression)) {
        tokens = tokens.slice(0, -1);
      }
      const values = [];
      const ops = [];

      // 辅助函数：执行操作
      const applyOp = () => {
        const op = ops.pop();
        const b = values.pop();
        const a = values.pop();
        values.push(operators[op](a, b));
      };

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (/^\d+(\.\d+)?$/.test(token)) {
          values.push(parseFloat(token));
        } else if (token === "(") {
          ops.push(token);
        } else if (token === ")") {
          while (ops[ops.length - 1] !== "(") {
            applyOp();
          }
          ops.pop();
        } else {
          while (
            ops.length > 0 &&
            precedence[ops[ops.length - 1]] >= precedence[token]
          ) {
            applyOp();
          }
          ops.push(token);
        }
      }

      while (ops.length > 0) {
        applyOp();
      }

      return values[0];
    },
    iconSecelt(item) {
      this.iconActive = item.id;
    },
  },
};
</script>

<style lang="scss">
.add_transation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
page {
  width: 100%;
  height: 100%;
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
.page-body {
  flex: 1;
  overflow: auto;
  .icon_warpper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    grid-gap: 20px 30px;
    padding: 20px 40px 10px;
    justify-items: center;
    box-sizing: border-box;

    .icon_for {
      width: 40px;
      display: grid;

      &:deep(.svg-icon) {
        background: #eee;
        padding: 10px;
        border-radius: 50%;
        box-sizing: border-box;
      }

      .icon_svg {
        border: 2px solid transparent;
      }
      .icon_text {
        display: block;
        width: 100%;
        margin-top: 5px;
        font-size: 12px;
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
      .icon_svg {
        border: 2px solid #55c9c9;
      }
      .icon_text {
        color: #55c9c9;
      }
    }
  }
  .invite-friends {
    // #ifdef MP-WEIXIN
    padding: 15px 20px calc(20px + env(safe - area - inset - bottom));
    // #endif
    // #ifndef MP-WEIXIN
    padding: 15px 20px 20px;
    // #endif
    width: 100%;
    box-sizing: border-box;
    .add_icon {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
      background: #55c9c9;
      color: #fff;
    }
  }
}
.page_padding {
  // #ifdef MP-WEIXIN
  padding-bottom: calc(320px + env(safe - area - inset - bottom)) !important;
  // #endif
  // #ifndef MP-WEIXIN
  padding-bottom: 320px !important;
  // #endif
}
.keyboard_warpper {
  // #ifdef MP-WEIXIN
  padding: 0 0 calc(env(safe - area - inset - bottom));
  // #endif
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 10px #aaa;
  .players {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #f0f0f0;
    .players_title {
      font-size: 13px;
    }
    .players_users {
      margin-left: auto;
      display: flex;
      align-items: center;
      font-size: 12px;
    }
  }
  .keyboard_number {
    font-size: 18px;
    color: #333;
    height: 40px;
    line-height: 40px;
    padding: 0 10px 0 45px;
    text-align: right;
    // border-bottom: 1px solid #f0f0f0;
    position: relative;
    .close {
      position: absolute;
      top: 0;
      left: 10px;
      color: #999;
      font-size: 13px;
      &:active {
        color: #333;
      }
    }
  }
  .description {
    padding: 0 10px 5px;
    .description_warpper {
      display: flex;
      align-items: center;
      padding: 0 0 0 10px;
      background: #f0f0f0;
      border-radius: 4px;
      .title {
        font-size: 13px;
      }
      .description_input {
        font-size: 13px;
        background: transparent;
        padding: 3px 10px !important;
        &:deep(.u-input__content) {
          .input-placeholder {
            font-size: 13px;
          }
          .uni-input-input {
            font-size: 13px;
          }
        }
      }
    }
  }
  .keyboard_button_warpper {
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0px 3px 2px #eee;
    .keyboard_button {
      width: calc(100% / 4);
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 2px #ddd;
      font-size: 13px;
      .button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .buttonCal {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon_but {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          height: 100%;
          box-shadow: 0 0 2px #ddd;
        }
      }
      .done {
        background: #55c9c9;
        color: #fff;
      }
      .time {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        .text {
          font-size: 12px;
        }
      }
      &:active {
        background: #f0f0f0;
      }
    }
    .keyboard_nobutton {
      &:active {
        background: transparent !important;
      }
      .buttonCal {
        .icon_but {
          &:active {
            background: #f0f0f0;
          }
        }
      }
    }
  }
}
</style>