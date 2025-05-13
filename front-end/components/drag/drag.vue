<template>
	<view
		class="scan-fixed"
		:style="{ bottom: bottom + 'px', right: right + 'px' }"
		@touchstart="start"
		@touchmove="move"
		@touchend="end"
		@click="jumpSendCard"
	>
		<view class="masks" v-if="isDrags"></view>
		<view class="icon"><uni-icons type="plusempty" size="30"></uni-icons></view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { useUserStore } from '../../stores/userStore.js';
	const bottom = ref(100);
	const right = ref(15);
	const pageX = ref(0);
	const pageY = ref(0);
	const userStores = useUserStore();
	const isDrags = ref(false);
	onMounted(() => {
		const xy = uni.getStorageSync('xy');
		if (xy) {
			bottom.value = xy.bottom;
			right.value = xy.right;
		}
	});
	function start(e) {
		isDrags.value = true;
		const page = e.changedTouches[0];
		pageX.value = page.pageX;
		pageY.value = page.pageY;
	}

	function move(e) {
		isDrags.value = true;
		const page = e.changedTouches[0];
		const x = page.pageX - pageX.value;
		const y = page.pageY - pageY.value;
		pageX.value = page.pageX;
		pageY.value = page.pageY;
		right.value -= x;
		bottom.value -= y;

		uni.setStorageSync('xy', {
			right: right.value,
			bottom: bottom.value
		});
	}
	function end(e) {
		const page = e.changedTouches[0];
		isDrags.value = false;
	}
	function checkLogin() {
		const isLogin = userStores.getUserData;
		if (!isLogin) {
			uni.showToast({
				title: '未登录，请先登录 ',
				icon: 'error'
			});
			uni.navigateTo({
				url: '/pages/login/login'
			});
		} else {
			uni.navigateTo({
				url: '/pages/post-page/post-page'
			});
		}
	}
	function jumpSendCard() {
		checkLogin();
	}
</script>

<style lang="scss" scoped>
	.scan-fixed {
		position: fixed;
		// bottom: 100px;
		// right: 15px;
		z-index: 9999;
		background: #ffffff;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
	}
	.icon {
		color: rgba(212, 48, 48, 1);
		font-size: 40upx;
		font-weight: bold;
	}
</style>
