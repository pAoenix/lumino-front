<template>
  <view class="icons_wapper">
    <up-cell-group>
      <up-cell title="图标名称">
        <template #value>
          <up-input
            placeholder="请输入内容"
            clearable
            border="surround"
            v-model="name"
          ></up-input>
        </template>
      </up-cell>
      <up-cell title="图标">
        <template #value>
          <up-upload
            :fileList="icon_file"
            @afterRead="afterRead"
            @delete="deletePic"
            name="图标"
            multiple
            :maxCount="1"
            :previewFullImage="true"
          ></up-upload>
        </template>
      </up-cell>
    </up-cell-group>
    <view class="bill_footer">
      <view class="bill_submit" @click="submit()"> 新增 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pic: "/static/logo.png",
      name: "",
      icon_file: [],
    };
  },
  onShow: function () {},
  methods: {
    async afterRead(event) {
      const file = event.file;
      this.icon_file = [
        {
          ...file[0], // 如果后续你还要上传
          name: this.name ? `${this.name}-图标` : file.name,
          type: "image",
        },
      ];
    },
    deletePic(event) {
      this.icon_file = [];
    },
    submit() {
      let userInfo = uni.getStorageSync("userInfo")
        ? JSON.parse(uni.getStorageSync("userInfo"))
        : null;
      uni.uploadFile({
        url: `${this.$baseURL}/api/v1/category`,
        filePath: this.icon_file[0]?.tempFilePath || this.icon_file[0]?.url, // 小程序中是 tempFilePath
        name: "icon_file", // 接口接收 file 的字段名
        formData: {
          user_id: userInfo.id,
          name: this.name,
        },
        success: (res) => {
          console.log(res, "-------res");
          if (res.statusCode == 413) {
            uni.showToast({
              title: "上传图片过大",
              icon: "none",
            });
          } else {
            if (res.data?.message) {
              uni.showToast({
                title: res.data.message,
                icon: "none",
              });
            } else {
              // uni.redirectTo({
              //   url: "/pages/my/icons",
              // });
              uni.navigateBack({
                delta: 1, // 返回上一级
              });
            }
          }
        },
        fail: (err) => {
          console.log(err, "------err");
          uni.showToast({
            title: "注册失败",
            icon: "none",
          });
        },
      });
    },
  },
};
</script>


<style lang="scss">
.icons_wapper {
  padding-bottom: env(safe - area - inset - bottom);
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
