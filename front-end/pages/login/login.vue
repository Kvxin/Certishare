<template>
	<view class="login-page" style="width: 100%">
		<!-- 放一个nav-bar占一下位 -->
		<uni-nav-bar :border="false" background-color="#fafafa"></uni-nav-bar>
		<!-- 返回的图标 -->
		<view class="back">
			<uni-icons type="arrow-left" size="32" @click="backIndex"></uni-icons>
		</view>
		<!-- 这里放logo和一些文字，直接放就行 -->
		<view class="login-top">
			<h1>{{ zh_Hans.login.loginPage.text.title }}</h1>
			<p class="pp">{{ zh_Hans.login.loginPage.text.prompt }}</p>
		</view>
		<!-- 这里放登录和注册相关的东西，使用组件 -->
		<view class="login-warp">
			<view class="login-div" :class="{ 'is-flipped': isFlipped }">
				<view class="r" :class="{ hide: hideBackWarp }">
					<LoginWarp />
				</view>
				<view class="r back-warp" :class="{ hide: !hideBackWarp }">
					<RegisterWarp />
				</view>
			</view>
		</view>
		<!-- 这里放底部的其他的logo -->
		<view class="login-other"></view>
		<!-- 这里放同意用户协议的 -->
		<view class="login-bottom"></view>
		<view></view>
	</view>
</template>

<script setup>
	import { onMounted, ref } from 'vue';
	import LoginWarp from '@/components/LoginWarp/LoginWarp.vue';
	import RegisterWarp from '@/components/RigisterWarp/RegisterWarp.vue';
	import zh_Hans from '@/i18n/zh-Hans.json';
	const fieldProps = zh_Hans.login.loginPage.field;
	const showRegister = ref(true);
	const isFlipped = ref(false);
	const hideBackWarp = ref(false);
	const toggleFlip = () => {
		isFlipped.value = !isFlipped.value;
		setTimeout(() => {
			hideBackWarp.value = isFlipped.value;
		}, 300);
	};
	const backIndex = () => {
		uni.navigateBack();
	};
	onMounted(() => {
		uni.$on('changeFlipped', () => {
			toggleFlip();
		});
	});
</script>

<style lang="scss">
	.page {
		height: 100%;
	}
	.hide {
		display: none;
	}

	.login-div {
		transform-style: preserve-3d;
		transition: transform 1s;
	}
	.login-warp {
		position: relative;
	}
	.r {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
	}
	.back-warp {
		transform: rotateY(180deg);
	}

	.is-flipped {
		transform: rotateY(180deg);
	}
	.login-page {
		background-color: #fafafa;
		height: 100%;
		.login-top {
			text-align: center;
			margin-top: 140rpx;
			color: #243555;
			.pp {
				margin-top: 24rpx;
				font-size: 24rpx;
				color: #c3c8d0;
			}
		}
	}
</style>
