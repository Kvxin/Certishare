<script setup>
	import { onMounted, ref } from 'vue';
	const topNav = ref([{ text: '首页' }, { text: '社区 ' }]);
	let activeIndex = ref(0); // 用于跟踪当前激活项的索引
	let barHeight = ref(0);
	const changePage = (index) => {
		activeIndex.value = index;
		uni.$emit('change-page', index === 0);
	};
	onMounted(() => {
		// #ifdef MP-WEIXIN
		wx.getSystemInfo({
			success: (res) => {
				barHeight.value = res.statusBarHeight;
			}
		});
		// #endif
	});
</script>

<template>
	<u-navbar>
		<template #left>
			<view class="nav-warp" :style="{ marginTop: barHeight + 'rpx' }">
				<view class="nav-warp-itemss">
					<view
						class="nav-item"
						v-for="(item, index) in topNav"
						@click="changePage(index)"
						:class="{ active: index == activeIndex }"
					>
						<text>{{ item.text }}</text>
					</view>
				</view>
			</view>
		</template>
	</u-navbar>
</template>

<style lang="scss" scoped>
	.nav-warp {
		width: 100%;
		min-height: 150rpx;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		.nav-warp-itemss {
			display: flex;
			background-position: 0% 0%;
			align-items: center;
			height: 100%;
			.active {
				transform: scale(1.2);
				font-weight: 700;
				font-size: 16px;
				color: #000;
				background: linear-gradient(to right, #000, #000) no-repeat left bottom;
				background-position: 0% 100%;
				animation: moveBack 0.3s ease forwards;
				transition: 0.3ms all;
			}
			.nav-item {
				margin-left: 20px;
				display: flex;
				align-items: center;
				height: 100%;
			}
		}
	}
	.is-mp-weixin {
		margin-top: 54px;
	}
	@keyframes moveBack {
		0% {
			background-size: 0% 3px;
		}
		100% {
			background-size: 100% 3px;
		}
	}
</style>
