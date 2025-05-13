import {
	defineStore
} from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({
		userData: uni.getStorageSync('userData') || null,
		token: uni.getStorageSync('token') || null,
		isLogin: uni.getStorageSync('isLogin') || null
	}),
	getters: {
		getUserData(state) {
			if (this.isLogin) {
				return state.userData
			} else {
				return null;
				// uni.showToast({
				// 	title: "当前未登录~"
				// })
				// uni.navigateTo({
				// 	url: '/pages/login/login'
				// })
			}
		}
	},
	actions: {
		setUser(data) {
			this.userData = data.userData;
			this.token = data.token;
			this.isLogin = true;
			// 存储到本地存储
			uni.setStorageSync('userData', data.userData);
			uni.setStorageSync('token', data.token);
			uni.setStorageSync('isLogin', this.isLogin);
		},
		updataUser(data) {
			this.userData = data.userData
			uni.setStorageSync('userData', data.userData);
		},
		logout() {
			this.userData = null;
			this.token = null;
			this.isLogin = false
			// 清除本地存储
			uni.removeStorageSync('userData');
			uni.removeStorageSync('token');
			uni.setStorageSync('isLogin', this.isLogin);
		}
	}
})