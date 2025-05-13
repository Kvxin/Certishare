<script setup>
	import { ref, defineEmits } from 'vue';
	import { sendCode, register } from '../../api/register.js';
	const show = ref(false);
	const content = ref('');
	const codeText = ref('获取验证码');
	const countdownInterval = ref(null);
	const email = ref('');
	const password = ref('');
	const code = ref('');
	const emit = defineEmits(['toggle']);

	const login = () => {
		uni.$emit('changeFlipped');
	};
	const _register = () => {
		const userData = {
			email: email.value,
			password: password.value,
			code: code.value
		};
		register(userData).then((res) => {
			uni.$emit('changeFlipped');
		});
	};
	const sendEmailCode = async () => {
		if (!email.value) {
			uni.showToast({
				title: '请填写邮箱',
				icon: 'none'
			});
			return;
		}
		uni.showLoading({
			title: '正在发送验证码....'
		});
		try {
			const res = await sendCode(email.value);
			console.log(res.status);
		} catch (error) {
			if (error.response && error.response.status === 429) {
				uni.showToast({
					title: error.response.data.message,
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: '请求失败，请稍后再试',
					icon: 'none'
				});
			}
		} finally {
			uni.hideLoading(); // 无论请求成功或失败，都隐藏加载提示
		}
	};
	const confirm = () => {
		setTimeout(() => {
			// 3秒后自动关闭
			show.value = false;
		}, 500);
	};
	const startCountdown = () => {
		if (countdownInterval.value) return;
		let remainingTime = 60;
		codeText.value = `${remainingTime}秒`;
		countdownInterval.value = setInterval(() => {
			remainingTime--;
			codeText.value = `${remainingTime}秒`;
			if (remainingTime <= 0) {
				clearInterval(countdownInterval.value);
				countdownInterval.value = null;
				codeText.value = '获取验证码';
			}
		}, 1000);
	};
	const checkFormAndRegister = () => {
		if (!email.value || !password.value || !code.value) {
			uni.showToast({
				title: '请填写所有字段',
				icon: 'none'
			});
			return;
		}
		emit('toggle');
		// 如果所有字段都填写了，继续注册逻辑
		_register(); // 假设这是你的注册函数
	};
</script>

<template>
	<view class="register-form-warp">
		<view class="register-form">
			<view class="username-input inputs">
				<text class="input-text">输入邮箱</text>
				<input type="text" placeholder="请输入邮箱" v-model="email" />
			</view>
			<view class="password-input inputs">
				<text class="input-text">输入密码</text>
				<input type="password" placeholder="请输入密码" v-model="password" />
			</view>
			<view class="password-input inputs code">
				<text class="input-text">输入验证码</text>
				<view class="code-warp">
					<input type="text" placeholder="请输入验证码" v-model="code" />
					<up-text :text="codeText" type="primary" @click="sendEmailCode"></up-text>
				</view>
			</view>
			<view class="no-account">
				<p class="p">
					已有账号?
					<span @click="login" class="span">返回登录</span>
				</p>
			</view>
			<view class="button-input">
				<up-button
					type="primary"
					text="注册"
					shape="circle"
					class="register-button"
					@click="checkFormAndRegister"
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

<style lang="scss" scoped>
	.register-form-warp {
		width: 670rpx;
		// background-color: red;
		height: 724rpx;
		position: relative;
		border-radius: 10rpx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.register-form {
		width: 90%;
		height: 90%;
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

	.register-button {
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

	.code-warp {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		input {
			width: 70%;
		}
	}
</style>
