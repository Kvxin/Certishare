import axios from 'axios';
import mpAdapter from "axios-miniprogram-adapter"
import uviewPlus from '../uni_modules/uview-plus';
axios.defaults.adapter = mpAdapter;

// 创建 axios 实例
const service = axios.create({
	// baseURL: 'http://127.0.0.1:3011', // API 基础URL
	baseURL: 'https://share.cs.kvxin.top/',
	timeout: 10000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
	config => {
		// 在这里可以添加一些请求前的逻辑
		let token = uni.getStorageSync('token');
		if (token) {

		} else {
			token = '';
		}
		config.headers['Authorization'] = token;
		return config;
	},
	error => {
		// 请求错误处理
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	response => {
		if (response.status === 200) {
			// uni.showToast({
			// 	title: response.data.message || response.data.msg,
			// 	icon: 'success',
			// })
			return response;
		} else {
			console.log("错误了", response);
			return Promise.reject(error);
		}
	},
);

export default service;