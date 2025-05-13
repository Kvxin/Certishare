<script setup>
	import { reactive, ref, onMounted } from 'vue';
	import { getUserData } from '../../api/user.js';
	import { useUserStore } from '../../stores/userStore.js';
	const userStore = useUserStore();
	const uerInfo = ref({});
	const userAllData = ref({});
	const login = ref();
	const version = ref('');
	const count = reactive([
		{
			num: '-',
			text: '我的卡片',
			path: 'my-post'
		},
		{
			num: '-',
			text: '我的帖子',
			path: 'my-post'
		},
		{
			num: '-',
			text: '历史记录',
			path: 'my-local'
		}
	]);
	const navs = reactive([
		{
			icon: '&#xe791;',
			text: '随机测试',
			path: 'answer',
			name: 'meiridati1'
		},
		{
			icon: '\ue62b',
			text: '签到',
			path: 'sign',
			name: 'qiandao'
		},
		{
			icon: '\ue689',
			text: '我的发布',
			path: 'my-post',
			name: 'wodefabu1'
		},
		{
			icon: '\ue622',
			text: '答题数据',
			name: 'zuotitongji'
		}
	]);
	const goLogin = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		});
	};
	const jump = (e) => {
		uni.navigateTo({
			url: `/pages/${e.path}/${e.path}`
		});
	};
	const checkLogin = () => {
		const userData = uni.getStorageSync('userData');
		if (userData) {
			uerInfo.value = userData;
			login.value = true;
		} else {
			login.value = false;
		}
		return userData ? true : false;
	};
	const init = () => {
		const cardLength = userAllData.value.cardLength;
		const postsLength = userAllData.value.posts.length;
		const watchedCardHistoryLenght = userAllData.value.watchedCardHistory.length;
		count[0].num = cardLength;
		count[1].num = postsLength;
		count[2].num = watchedCardHistoryLenght;
	};
	const getH5Version = () => {
		const systemInfo = uni.getSystemInfoSync();
		version.value = `v${systemInfo.appVersion}`;
	};
	const getAppVersion = () => {
		const systemInfo = uni.getSystemInfoSync();
		version.value = `v${systemInfo.appWgtVersion}`;
	};
	const getWeiXinVersion = () => {
		const accountInfo = wx.getAccountInfoSync();
		version.value = accountInfo.miniProgram.version;
	};
	const logOut = () => {
		if (!uerInfo) {
			uni.showToast({
				title: '当前未登录账号',
				icon: 'none'
			});
			return;
		}
		userStore.logout();
		uni.showToast({
			title: '退出成功',
			icon: 'none'
		});
		uni.redirectTo({
			url: '/pages/login/login'
		});
	};

	const jumpToSetting = () => {
		if (!checkLogin()) {
			uni.showToast({
				title: '未登录',
				icon: 'none'
			});
			return;
		}
		uni.navigateTo({
			url: `/pages/setting/setting?id=${uerInfo.value.id}`
		});
	};
	onMounted(async () => {
		// #ifdef H5
		getH5Version();
		// #endif

		// #ifdef APP
		getAppVersion();
		// #endif

		// #ifdef MP-MP-WEIXIN
		getWeiXinVersion();
		// #endif
		if (checkLogin()) {
			const ids = uni.getStorageSync('userData');
			if (ids) {
				getUserData(ids.id)
					.then((res) => {
						userAllData.value = res.data;
						init();
					})
					.catch((e) => {
						console.log(e);
					});
			} else {
				return;
			}
		}
	});
</script>

<template>
	<view class="center warp">
		<view class="bg center my-warp">
			<view class="logo" :hover-class="!login ? 'logo-hover' : ''" v-if="login">
				<image class="logo-img" :src="login ? uerInfo.avatar : avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">{{ login ? uerInfo.username : '您未登录' }}</text>
					<text class="uer-uid"></text>
				</view>
			</view>
			<view class="logo-no-login" v-if="!login">
				<view class="login-button">
					<up-button type="primary" text="点击登录" @click="goLogin"></up-button>
				</view>
			</view>
			<view class="count">
				<view class="count-item" v-for="(c, index) in count" @click="jump(c)">
					<text class="count-item-num">{{ c.num }}</text>
					<text class="count-item-text">{{ c.text }}</text>
				</view>
			</view>
		</view>
		<view class="center-nav margin-top">
			<view class="center-nav-title">
				<text style="font-size: 18px">快捷入口</text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="center-nav-content">
				<view
					class="center-nav-item icon-mp-weixin"
					:class="['t-icon', `t-icon-color-${nav.name}`]"
					v-for="(nav, index) in navs"
					:key="nav.path"
					@click="jump(nav)"
				>
					<text class="center-nav-item-text icon-mp-weixin-text">{{ nav.text }}</text>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP -->
			<view class="center-nav-content">
				<view
					class="center-nav-item icon-mp-weixin"
					:class="['t-icon', `t-icon-color-${nav.name}`]"
					v-for="(nav, index) in navs"
					:key="nav.path"
					@click="jump(nav)"
				>
					<text class="center-nav-item-text icon-mp-weixin-text">{{ nav.text }}</text>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="center-nav-content">
				<view
					class="center-nav-item"
					v-for="(nav, index) in navs"
					:key="nav.path"
					@click="jump(nav)"
				>
					<text
						class="iconfont-color nav-item-color"
						style="width: 64px; height: 64px"
						v-html="nav.icon"
					></text>
					<text class="center-nav-item-text">{{ nav.text }}</text>
				</view>
			</view>
			<!-- #endif -->
		</view>
		<view class="center-list">
			<navigator url="/pages/message/message">
				<view class="center-list-item">
					<text class="list-icon color-2">&#xe60b;</text>
					<text class="list-text">新消息通知</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</navigator>
			<view class="center-list-item" @click="jumpToSetting()">
				<text class="list-icon color-2">&#xe60b;</text>
				<text class="list-text">修改个人信息</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<!--  -->
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon color-3">&#xe60c;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon color-4">&#xe60c;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<!--  -->
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon color-1">&#xe60e;</text>
				<text class="list-text" @click="logOut">退出登录</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon color-1">&#xe60d;</text>
				<text class="list-text">关于应用</text>
				<text style="color: #999">{{ version }}</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<style lang="scss">
	@import url('@/static/recolors/iconfont-weapp/icon-my-weapp.css');
</style>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/c/font_4218190_6debofuo8gh.ttf?t=1701960489041')
			format('truetype');
	}
	/* @font-face {
		font-family: 'iconfont-colors';
		src: url('//at.alicdn.com/t/c/font_4445148_c6jgoqggrh8.woff2?t=1710143573894')
				format('woff2'),
			url('//at.alicdn.com/t/c/font_4445148_c6jgoqggrh8.woff?t=1710143573894') format('woff'),
			url('//at.alicdn.com/t/c/font_4445148_c6jgoqggrh8.ttf?t=1710143573894')
				format('truetype');
	} */
	page,
	view {
		display: flex;
	}

	page {
		background-color: #f4f4f4;
	}

	.center {
		flex-direction: column;
	}
	.warp {
		background-image: url('https://picturebed.kvxin.top/certishare_asstes/my/bg.jpg');
		background-size: 100% 50%;
		background-repeat: no-repeat;
		background-color: white;
	}
	.my-warp {
		margin-top: 40rpx;
	}
</style>
<style lang="scss" scoped>
	$head-color: #cd3b33;
	$white-color: #000;
	$radius: 5rpx;
	$border-color: #efefef;
	$color-1: #007aff;
	$color-2: #4cd964;
	$color-3: #f0ad4e;
	$color-4: #dd524d;
	$list-item-height: 100rpx;
	$list-margin: 20rpx;
	.iconfont-color {
		font-family: iconfont-color;
	}
	.nav-item-color {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 64rpx;
	}
	.bg {
		min-height: 510rpx;
		border-bottom-left-radius: 30%;
		border-bottom-right-radius: 30%;
		.logo {
			width: 100vw;
			padding: 20rpx 50rpx 35rpx;
			box-sizing: border-box;
			flex-direction: row;
			align-items: center;
			.logo-img {
				width: 140rpx;
				height: 140rpx;
				border-radius: 150rpx;
			}
			.logo-title {
				height: 150rpx;
				// flex: 1;
				// align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-left: 20rpx;
				.uer-name {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 34rpx;
					color: #ffffff;
				}
				.uer-uid {
					color: #fff;
					font-size: 24rpx;
				}
				.go-login.navigat-arrow {
					font-size: 38rpx;
					color: #ffffff;
				}
			}
		}
		.logo-no-login {
			width: 100vw;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.login-button {
				width: 50%;
			}
		}
		.logo-hover {
			opacity: 0.8;
		}
		.login-title {
			height: 150rpx;
			align-items: self-start;
			justify-content: center;
			flex-direction: column;
			margin-left: 20rpx;
		}

		.count {
			margin: 0rpx auto 0rpx;
			width: calc(100vw - 100rpx);
			.count-item {
				flex-direction: column;
				flex: 1;
				text-align: center;

				.count-item-num {
					color: $white-color;
					font-size: 36rpx;
					font-weight: 500;
				}
				.count-item-text {
					color: $white-color;
					font-size: 28rpx;
					font-weight: 700;
					margin-top: 10rpx;
				}
			}
		}
	}
	.center-list {
		background-color: #ffffff;
		margin: 0 auto $list-margin;
		width: calc(100vw - 50rpx);
		flex-direction: column;
		border-radius: $radius;

		.center-list-item {
			height: $list-item-height;
			width: 100%;
			box-sizing: border-box;
			flex-direction: row;
			padding: 0rpx 20rpx;
			justify-content: center;
			align-items: center;
			.list-icon {
				width: 40rpx;
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 45rpx;
				color: #4cd964;
				text-align: center;
				font-family: texticons;
				margin-right: 20rpx;
			}
			.color-1 {
				color: $color-1;
			}
			.color-2 {
				color: $color-2;
			}
			.color-3 {
				color: $color-3;
			}
			.color-4 {
				color: $color-4;
			}

			.list-text {
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 32rpx;
				color: #555;
				flex: 1;
				text-align: left;
			}

			.navigat-arrow {
				height: $list-item-height;
				line-height: $list-item-height;
				width: 40rpx;
				font-size: 30rpx;
				color: #999;
				text-align: right;
				font-family: texticons;
			}
		}
		.border-bottom {
			border-bottom-width: 1rpx;
			border-color: $border-color;
			border-bottom-style: solid;
		}
	}
	.center-nav {
		background-color: #ffffff;
		margin: 0rpx auto $list-margin;
		width: calc(100vw - 50rpx);
		flex-direction: column;
		border-radius: $radius;
		box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
		.center-nav-title {
			padding: 25rpx 30rpx;
			font-size: 34rpx;
			color: #333;
			font-weight: 400;
			border-bottom: solid 1rpx $border-color;
		}
		.center-nav-content {
			height: 180rpx;
			display: flex;
			align-items: center;
			.center-nav-item {
				flex-direction: column;
				flex: 1;
				text-align: center;
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
				.center-nav-item-icon {
					color: #333;
					font-size: 48rpx;
					font-weight: 500;
					font-family: iconfont;
				}
				.center-nav-item-text {
					color: #666;
					font-size: 30rpx;
					font-weight: 400;
					margin-top: 15rpx;
				}
			}
			.icon-mp-weixin {
				position: relative;
				flex-direction: column;
				width: 64rpx;
				height: 64rpx;
				justify-content: space-between;
				flex: 1;
				text-align: center;
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
				font-size: 48rpx;
			}
			.icon-mp-weixin-text {
				position: absolute;
				top: 100%;
				left: 50%;
				transform: translate(-50%, 0%);
				width: 130rpx;
			}
		}
	}
	.margin-top {
		margin-top: -190rpx;
		min-height: 230rpx;
	}
</style>
