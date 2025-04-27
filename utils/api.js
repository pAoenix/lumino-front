import request from './request'; // 引入配置好的 axios 实例

// 获取账单信息
export const getTransaction = (params) => {
	return request({
		url: '/api/v1/transaction',
		method: "get",
		params
	})
};
// 创建账单信息
export const addTransaction = (data) => {
	return request({
		url: '/api/v1/transaction',
		method: "post",
		data
	})
};
// 创建账单信息
export const addAccount = (data) => {
	return request({
		url: '/api/v1/account',
		method: "post",
		data
	})
};
// 创建账单分类
export const addCategory = (data) => {
	return request({
		url: '/api/v1/category',
		method: "post",
		data
	})
};
export const getUserInfo = (params) => {
	return request({
		url: '/api/v1/user',
		method: "get",
		params
	})
};