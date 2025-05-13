<script setup>
	import { ref, defineEmits } from 'vue';
	import { useUserStore } from '../../stores/userStore.js';
	import { login } from '@/api/login.js';
	const show = ref(false);
	const email = ref('');
	const password = ref('');
	const emit = defineEmits(['toggle']);
	const userStore = useUserStore();

	const register = () => {
		uni.$emit('changeFlipped');
	};
	const _login = () => {
		if (!email.value || !password.value) {
			uni.showToast({
				title: '请填写所有字段',
				icon: 'none'
			});
			return;
		}
		login(email.value, password.value)
			.then((res) => {
				const data = {
					token: res.data.token,
					userData: res.data.userData
				};
				userStore.setUser(data);
				uni.switchTab({
					url: '/pages/index/index'
				});
			})
			.catch((err) => {
				uni.showToast({
					title: '账号或密码填写错误',
					icon: 'none'
				});
			});
	};
	const confirm = () => {
		setTimeout(() => {
			show.value = false;
		}, 500);
	};
</script>

<template>
	<view class="login-form-warp">
		<view class="login-form">
			<view class="username-input inputs">
				<text class="input-text">输入邮箱</text>
				<input type="text" placeholder="请输入邮箱" v-model="email" />
			</view>
			<view class="password-input inputs">
				<text class="input-text">输入密码</text>
				<input type="password" placeholder="请输入密码" v-model="password" />
			</view>
			<view class="no-account">
				<p class="p">
					没有账号?
					<span @click="register" class="span">立即注册!</span>
				</p>
			</view>
			<view class="button-input">
				<up-button
					type="primary"
					text="登录"
					shape="circle"
					class="login-button"
					@click="_login"
				></up-button>
			</view>
		</view>
		<!-- 模态框 用于没有输入密码之类的提示 -->
		<view>
			<u-modal
				:show="show"
				@confirm="confirm"
				ref="uModal"
				:asyncClose="true"
				:closeOnClickOverlay="true"
				:zoom="true"
				title="提示"
			></u-modal>
		</view>
	</view>
</template>
<style lang="scss">
	.login-form-warp {
		width: 670rpx;
		// background-color: red;
		height: 554rpx;
		position: relative;
		border-radius: 10rpx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-form {
		width: 90%;
		height: 80%;
		background-color: #fff;
		padding: 40rpx;
	}

	.inputs {
		height: 100rpx;
		margin-top: 60rpx;
		background: linear-gradient(to right, blue, #000) left bottom;
		background-size: 0rpx 3rpx;
		border-bottom: 3rpx solid #eee;
		background-repeat: no-repeat;

		input {
			padding: 10rpx;
			font-size: 14px;
		}
	}

	.input-text {
		color: #203152;
		font-size: 24rpx;
		margin-bottom: 10rpx;
		display: block;
	}

	.button-input {
		position: absolute;
		width: 560rpx;
		height: 110rpx;
		top: 100%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.login-button {
		box-shadow: 0px 29px 26px -5px rgba(37, 99, 235, 0.2);
	}

	.no-account {
		margin-top: 50rpx;
		width: 100%;
		text-align: center;

		.p {
			font-size: 12px;

			.span {
				text-decoration: underline;
			}
		}
	}
</style>
