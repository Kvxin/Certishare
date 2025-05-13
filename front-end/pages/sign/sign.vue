<template>
	<view>
		<signInVue
			:yearMonth="targetDate"
			:dataSource="signData"
			@dateChange="getData"
			@clickChange="clickSign"
		></signInVue>
		<view class="count">
			<text>截至目前，已坚持打卡</text>
			<view class="daynumber">
				<text class="number">{{ sumCount }}</text>
				<text class="day">天</text>
			</view>

			<view>
				本月累积打卡
				<text class="monthSum">{{ signData.length }}</text>
				天
			</view>
			<text>请再接再厉，继续努力!</text>
		</view>
	</view>
</template>
<script setup>
	import signInVue from '../../components/SignIn/signIn.vue';
	import { ref, onMounted, onUnmounted } from 'vue';
	import { singIn, getUserSignData } from '../../api/user.js';
	import { useUserStore } from '../../stores/userStore.js';
	const targetDate =
		parseInt(new Date().getFullYear()) + '-' + parseInt(new Date().getMonth() + 1); //本月
	const sumCount = ref(0);
	const signData = ref([]);
	const userInfo = useUserStore().getUserData;

	const clickSign = (day) => {
		signData.value.push(day);
		sumCount.value++;
		const data = {
			date: day,
			userId: userInfo.id
		};
		singIn(data).then((res) => {
			console.log(res);
		});
	};
	const getData = () => {
		getUserSignData().then((res) => {
			signData.value = res.data.dates;
			sumCount.value = signData.value.length;
		});
	};
	onMounted(() => {
		uni.$on('clickChange', (e) => {
			clickSign(e);
		});
		uni.$on('dateChange', (e) => {
			getData(e);
		});
		getData();
	});
	onUnmounted(() => {
		uni.$off('clickChange');
		uni.$off('dateChange');
	});
</script>

<style>
	.count .daynumber {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.count .daynumber .day {
		margin-top: 50rpx;
	}

	.count {
		margin: 20rpx;
		padding: 30rpx;
		display: flex;
		text-align: center;
		border-radius: 10px;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
	}

	.count .number {
		color: #fff;
		font-size: 60rpx;
		background-color: #94db98;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 20rpx;
	}

	.monthSum {
		color: red;
		font-size: 40rpx;
	}

	.count text {
		margin: 10rpx;
	}

	.TipArea {
		word-break: break-all;
		word-wrap: break-word;
		font-size: 14px;
		padding: 10px;
	}
	.impTip {
		display: inline-block;
		color: #ff0000;
	}
</style>
