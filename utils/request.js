import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
	baseURL: 'https://happyall.xyz', // 设置接口的根 URL
	timeout: 10000, // 请求超时时间
	headers: {
		'Content-Type': 'application/json',
	}
});

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 在请求之前处理，例如添加 Token
		const token = uni.getStorageSync('token'); // 从 localStorage 或 Vuex 中获取 Token
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
instance.interceptors.response.use(
	(response) => {
		console.log(response);
		return response.data;
		// 处理响应数据
		if (response.status === 200) {
			return response.data; // 返回实际数据
		} else {
			return Promise.reject('请求失败');
		}
	},
	(error) => {
		// 处理错误
		uni.showToast({
			title: '请求失败，请稍后再试',
			icon: 'none',
		});
		return Promise.reject(error);
	}
);

export default instance;