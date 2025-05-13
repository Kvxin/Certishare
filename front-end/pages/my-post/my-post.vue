<template>
	<uni-nav-bar
		:fixed="true"
		shadow
		status-bar
		left-icon="left"
		right-width="30px"
		@clickLeft="back"
		height="65px"
		class="nav-bar"
		:border="false"
		title="我的发布"
	></uni-nav-bar>
	<view class="bg">
		<image
			src="https://picturebed.kvxin.top/certishare_asstes/undraw_Wall_post_re_y78d.png"
			mode="aspectFill"
		></image>
		<text>这里会保存你曾经发布的记录哦~</text>
	</view>
	<CardAndPostVue />
</template>

<script setup>
	import { useUserStore } from '../../stores/userStore.js';
	import { onMounted, ref } from 'vue';
	import CardAndPostVue from '../../components/CardAndPost/CardAndPost';
	function back() {
		uni.navigateBack();
	}
</script>

<style lang="scss" scoped>
	.bg {
		width: 100%;
		height: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	uni-page-body {
		width: 100vw;
		height: auto;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
</style>
