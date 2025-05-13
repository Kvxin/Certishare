<template>
	<view class="result-page">
		<AnswerResultEchartsVue :types="result.typeWrongCount" />
		<view class="information">
			<view class="item">
				<span class="percentage">{{ 10 }}</span>
				<span class="item_text">题目数量</span>
			</view>
			<view class="item">
				<span class="percentage">{{ 10 - result.wrongCount }}</span>
				<span class="item_text">正确题目</span>
			</view>
			<view class="item">
				<span class="percentage">{{ result.passingRate }}%</span>
				<span class="item_text">通过率</span>
			</view>
		</view>
		<view class="results" style="width: 90%; margin-top: 30px">
			<view class="text">
				<span style="font-size: 14px">错题解析:</span>
			</view>
			<u-divider></u-divider>
			<view class="result-items">
				<view
					class="result-item"
					style="display: flex; flex-direction: column; justify-content: space-between"
					v-for="(item, index) in result.wrongQuestions"
				>
					<view class="result-item-title" style="font-size: 16px; font-weight: 700">
						{{ item.title }}
					</view>
					<view class="result-item-options" v-for="(p, index) in item.optionsData">
						{{ index }}. {{ p }}
					</view>
					<view
						class="result-answer"
						style="
							display: flex;
							justify-content: space-between;
							width: 50%;
							margin-top: 10px;
						"
					>
						<span>你的答案:{{ item.userAnswer }}</span>
						<span>正确答案:{{ item.correctAnswer }}</span>
					</view>
					<view class="result-analysis" style="margin-top: 15px; height: auto">
						问题解析:{{ item.analysis }}
					</view>
					<u-divider></u-divider>
				</view>
			</view>
			<view class="buttons" style="display: flex; margin-top: 20px">
				<button @click="reback">重新测试</button>
				<button @click="back">返回首页</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import AnswerResultEchartsVue from '../../components/AnswerResultEcharts/AnswerResultEcharts.vue';

	import { ref } from 'vue';
	let result = ref({});
	const type = ref([]);
	const reback = () => {
		uni.navigateTo({
			url: '/pages/answer/answer'
		});
	};
	const back = () => {
		uni.switchTab({
			url: '/pages/my/my'
		});
	};
	const init = () => {};
	onLoad((option) => {
		if (option.result) {
			// #ifdef MP-WEIXIN
			const parsedResult = JSON.parse(decodeURIComponent(option.result));
			// #endif
			// #ifndef MP-WEIXIN
			const parsedResult = JSON.parse(option.result);
			// #endif
			result.value = parsedResult.data;
			init();
		}
	});
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: auto;
	}
	.result-page {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #fff;
		height: auto;
		.information {
			margin-top: 44px;
			width: 80%;
			height: auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.item {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 50rpx;
				color: #000;
				.item_text {
					font-size: 24rpx;
					color: #000;
				}
			}
		}
	}
</style>
