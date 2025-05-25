"use strict";
const common_vendor = require("../common/vendor.js");
const instance = common_vendor.axios.create({
  baseURL: "https://happyall.xyz",
  // 设置接口的根 URL
  timeout: 1e4,
  // 请求超时时间
  headers: {
    "Content-Type": "application/json"
  }
});
instance.interceptors.request.use(
  (config) => {
    const token = common_vendor.index.getStorageSync("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    common_vendor.index.__f__("log", "at utils/request.js:30", response);
    return response.data;
  },
  (error) => {
    common_vendor.index.showToast({
      title: "请求失败，请稍后再试",
      icon: "none"
    });
    return Promise.reject(error);
  }
);
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
