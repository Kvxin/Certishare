<template>
	<view class="search-page">
		<uni-nav-bar
			:fixed="true"
			shadow
			status-bar
			left-icon="left"
			left-text="返回"
			right-text="搜索"
			right-width="30px"
			@clickLeft="back"
			@clickRight="search"
			height="65px"
			class="nav-bar"
			:border="false"
			:gradientColors="['#ff9a9e', '#fad0c4']"
		>
			<view class="search-box">
				<u-search
					placeholder="点击进行搜索"
					shape="square"
					:clearabled="true"
					actionText=""
					:actionStyle="actionStyle"
					v-model="searchInput"
				></u-search>
			</view>
		</uni-nav-bar>

		<view class="search-warp">
			<view class="search-history">
				<view class="history-title">
					<view class="left">
						<view class="pin"></view>
						<text>历史记录</text>
					</view>
					<view class="right" @click="clearHistory">
						<span>x</span>
					</view>
				</view>
				<view class="history-body">
					<view class="history-items">
						<view
							class="history-item"
							v-for="(item, index) in searchHistory"
							:key="index"
							@click="jump(item)"
						>
							{{ item }}
						</view>
					</view>
				</view>
			</view>
			<!-- 大家都在搜 -->
			<div class="searchBoard">
				<div class="board-titleBar">
					<!-- 放一个热点图备用 -->
					<view class="left">
						<view class="pin-2"></view>
						<span style="color: #000">热点</span>
					</view>
					<view class="right">
						<image
							class="board-titleBar-txtImg"
							src="https://api.myisre.cn/eba2b57a7698842033d1c4a11.png"
							mode="heightFix"
						></image>
					</view>
				</div>
				<div class="rankList-type1">
					<div
						class="rankItem-type1"
						v-for="(item, index) in searchHots"
						:key="key"
						@click="jump(item)"
					>
						<span class="rankItem-type1-num rankItem-type1-num-act">
							{{ index + 1 }}
						</span>
						{{ item }}
					</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { getSearchHot } from '../../api/search.js';
	import { onLoad } from '@dcloudio/uni-app';
	const searchInput = ref('');
	const searchHistory = ref([]);
	const searchHots = ref([]);
	const actionStyle = ref({
		display: 'none'
	});
	const back = () => {
		uni.navigateBack();
	};
	const search = () => {
		if (searchInput.value.trim() !== '') {
			let history = uni.getStorageSync('searchHistory') || [];
			history.push(searchInput.value);
			uni.setStorageSync('searchHistory', history);
			// loadHistory();
			uni.navigateTo({
				url: `/pages/search-result/search-result?searchKey=${searchInput.value}`
			});
		}
	};
	const clearHistory = () => {
		uni.removeStorageSync('searchHistory');
		searchHistory.value = [];
	};
	//这里用来加载数组
	const loadHistory = () => {
		searchHistory.value = uni.getStorageSync('searchHistory') || [];
	};
	const jump = (e) => {
		uni.navigateTo({
			url: `/pages/search-result/search-result?searchKey=${e}`
		});
	};
	const getHot = () => {
		getSearchHot().then((res) => {
			searchHots.value = res.data;
		});
	};

	onLoad(() => {
		loadHistory();
	});
	onMounted(() => {
		loadHistory();
		getHot();
	});
</script>

<style lang="scss" scoped>
	/* #ifdef MP-WEIXIN */
	body {
		transition: 0.1s all;
	}
	/* #endif */

	/* #ifndef MP-WEIXIN */
	* {
		transition: 0.1s all;
	}
	/* #endif */
	.nav-bar {
		background: #ee9ca7; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			rgb(238, 156, 167),
			rgb(255, 221, 225)
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			rgb(238, 156, 167),
			rgb(255, 221, 225)
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	.pin {
		width: 20rpx;
		height: 30rpx;
		background-color: aqua;
		filter: blur(1.8px);
		margin-right: 10rpx;
	}
	.pin-2 {
		width: 20rpx;
		height: 30rpx;
		background-color: #f7797d;
		filter: blur(1.8px);
		margin-right: 10rpx;
	}
	.search-page {
		width: 750rpx;
		.search-box {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.search-warp {
			width: 100%;
			.search-history {
				width: 100%;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.history-title {
					width: 80%;
					display: flex;
					justify-content: space-between;
					// margin-top: 150rpx;
					.left {
						display: flex;
						align-items: center;
					}
				}
				.history-body {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					.history-items {
						display: flex;
						flex-wrap: wrap;
						width: 90%;
						margin-top: 20rpx;
						.history-item {
							margin-right: 20rpx;
							margin-bottom: 20rpx;
							height: 54rpx;
							line-height: 54rpx;
							padding: 0 12rpx;
							border-radius: 27rpx;
							text-align: center;
							font-size: 22rpx;
							border-radius: 30px;
							border: 1px solid #eee;
							color: #000;
						}
					}
				}
			}
			.searchBoard {
				padding: 30rpx;
				border-radius: 30rpx;
				// background-image: linear-gradient(to bottom, #1f3037 10%, #202125);
				background: #ffefba; /* fallback for old browsers */
				background: -webkit-linear-gradient(
					to bottom,
					rgb(255, 239, 186),
					rgb(255, 255, 255)
				); /* Chrome 10-25, Safari 5.1-6 */
				background: linear-gradient(
					to bottom,
					rgb(255, 239, 186),
					rgb(255, 255, 255)
				); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
				// margin-bottom: 30rpx;
				margin-top: 210rpx;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			.board-titleBar {
				margin-bottom: 30rpx;
				display: flex;
				align-items: center;
				width: 80%;
				justify-content: space-between;
				.left {
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.board-titleBar-txtImg {
				height: 48rpx;
			}
			.board-titleBar-more {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				color: fff;
			}
			.titleBar-more-iconRig {
				margin-left: 10rpx;
				height: 22rpx;
			}
			.rankList-type1 {
				height: 320rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex-wrap: wrap;
			}
			.rankItem-type1 {
				width: 50%;
				min-width: 0;
				font-size: 30rpx;
				color: #000;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.rankItem-type1-num {
				display: inline-block;
				margin-right: 24rpx;
				margin-bottom: 30rpx;
				font-size: 32rpx;
			}

			.rankItem-type1-num-act {
				color: #3ffef0;
			}
			.rank-hot-txt {
				margin-left: 10rpx;
				height: 18rpx;
				vertical-align: middle;
			}
			.searchBoard2 {
				background-image: linear-gradient(to bottom, #222637 10%, #202125);
			}
			.rankItem-type2 {
				display: flex;
				align-items: center;
				margin-bottom: 36rpx;
			}
			.rankItem-type2-num {
				font-size: 36rpx;
				font-style: oblique;
				color: #fefefe;
			}
			.rankItem-type2-avatar {
				margin: 0 20rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 16rpx;
			}
			.rankItem-type2-title {
				font-size: 28rpx;
				color: #fefefe;
			}
		}
	}
</style>
