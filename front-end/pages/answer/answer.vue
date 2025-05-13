<template>
	<view class="answer-page">
		<u-navbar back-text="返回" title="知识问答" @leftClick="back"></u-navbar>
		<view class="statistics">
			<view class="items">
				<view class="item">
					<span class="percentage">{{ userData.answerNum }}</span>
					<span class="item_text">答题次数</span>
				</view>
				<view class="item">
					<span class="percentage">{{ userData.questionNum }}</span>
					<span class="item_text">练习题</span>
				</view>
				<view class="item">
					<span class="percentage">{{ userData.passingRate }}%</span>
					<span class="item_text">通过率</span>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="info">
				<span>点击下方按钮开始进入答题环节</span>
			</view>
			<view class="question_list">
				<span
					v-for="(item, index) in questionList"
					:key="index"
					class="list"
					:class="{ active: selectQuestionList.includes(item) }"
					@click="choose(index, item)"
				>
					{{ item }}
				</span>
			</view>
			<view class="tips">
				<p>1.每次选取十道题</p>
				<p>2.题型均为单选题</p>
				<p>3.可以自行选择什么类型的题目</p>
				<p>4.暂时每次只可以选择({{ selectedCount }}/3)中类型的题目</p>
			</view>
			<view>
				<!-- <myKnowledge></myKnowledge> -->
			</view>
			<view class="button">
				<u-button type="primary" :ripple="true" ripple-bg-color="#909399" @click="start">
					开始答题
				</u-button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';

	const questionList = [
		'javascript类',
		'前端类',
		'Rust',
		'python类',
		'公共基础',
		'css',
		'html',
		'C++',
		'Go',
		'Java'
	];
	const selectQuestionList = ref([]);
	const selectedCount = ref(0);
	const userData = ref({
		answerNum: '-',
		questionNum: '-',
		passingRate: '-'
	});
	const choose = (index, item) => {
		if (selectQuestionList.value.includes(item)) {
			const selectedIndex = selectQuestionList.value.indexOf(item);
			selectQuestionList.value.splice(selectedIndex, 1);
		} else if (selectedCount.value < 3) {
			selectQuestionList.value.push(item);
		}
		selectedCount.value = selectQuestionList.value.length;
	};

	const start = () => {
		uni.navigateTo({
			url: `/pages/knowledge/knowledge?selectQuestionList=${JSON.parse(
				JSON.stringify(selectQuestionList.value)
			)}`
		});
	};

	const init = async () => {};

	const back = () => {
		uni.navigateBack();
	};
	onMounted(() => {
		init();
	});
</script>

<style lang="scss" scoped>
	.answer-page {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.statistics {
		width: 100%;
		height: 300rpx;
		margin-top: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		&::after {
			content: '';
			position: absolute;
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			background-color: red;
			filter: blur(80px);
			top: -50%;
			left: 10%;
		}
		&::before {
			content: '';
			position: absolute;
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			background-color: blue;
			filter: blur(80px);
			top: 0%;
			left: 60%;
		}
		.items {
			width: 80%;
			height: 100%;
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
	.main {
		width: 90%;
		height: 500px;
		// background-color: red;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		.info {
			span {
				font-size: 14px;
			}
		}
		.question_list {
			width: 100%;
			height: 60%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			.list {
				height: 22px;
				border-radius: 5px;
				border: 1px solid #eee;
				padding: 7px;
				transition: 0.3s;
				font-size: 14px;
				&.active {
					background-color: #6dd5fa;
					color: #fff;
				}
			}
		}
		.tips {
			p {
				font-size: 14px;
			}
		}
	}
</style>
