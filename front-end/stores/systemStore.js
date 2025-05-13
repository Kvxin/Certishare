import {
	defineStore
} from 'pinia'

export const systemStore = defineStore('system', {
	state: () => ({
		navBar: uni.getStorageSync('navBar') || {}
	}),
	getters: {
		getSystemNav(state) {
			return state.navBar
		}
	},
	actions: {
		setNavBar(data) {
			uni.setStorageSync('navBar', data);
			this.navBar = data;
		}
	}
})