<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getQuestion, postAnswer } from '../../api/answer';
	import { useUserStore } from '@/stores/userStore.js';
	const userStore = useUserStore();
	const userInfo = userStore.userData;
	const userAnswers = ref([]);
	const questionList = ref([]);
	const left = ref(0);
	const questionNum = ref(0);
	const init = () => {
		questionList.value.forEach((e) => {
			const data = {
				_id: e._id,
				answerKey: ''
			};
			userAnswers.value.push(data);
		});
	};

	const selectAnswer = (option, index, item) => {
		userAnswers.value[item].answerKey = index;
	};

	const isSelected = (itemIndex, optionIndex) => {
		return userAnswers.value[itemIndex].answerKey === optionIndex;
	};

	const pre = () => {
		if (questionNum.value == 0) {
			uni.showToast({
				title: '已经是第一题了',
				icon: 'none'
			});
			return;
		}
		questionNum.value--;
		left.value += 352 * 2;
	};

	const next = () => {
		if (questionNum.value == 9) {
			uni.showToast({
				title: '已经是最后一题了',
				icon: 'none'
			});
			return;
		}
		questionNum.value++;
		left.value -= 352 * 2;
	};

	const jumpNum = (index) => {
		questionNum.value = index;
		left.value = index * -352 * 2;
	};

	const submit = () => {
		uni.showToast({
			title: '正在提交答案...',
			icon: 'loading'
		});
		const answer = {
			userAnswers: userAnswers.value,
			userId: userInfo.id
		};

		postAnswer(answer)
			.then((res) => {
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: `/pages/answer-result/answer-result?result=${encodeURIComponent(
						JSON.stringify(res.data)
					)}`
				});
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: `/pages/answer-result/answer-result?result=${JSON.stringify(res.data)}`
				});
				// #endif
			})
			.catch((err) => {
				console.log(err);
			});
	};
	onLoad((options) => {
		const selectQuestionList = options.selectQuestionList;
		const userId = userInfo.id;
		getQuestion(selectQuestionList, userId).then((res) => {
			questionList.value = res.data.data;
			init();
		});
	});
</script>

<template>
	<view class="knowledge-page">
		<view class="knowledge-warp">
			<view class="knowledge-title">
				<h2 style="color: #fff">知识问答</h2>
			</view>
			<view class="point">
				<span
					v-for="index in 10"
					:key="index"
					:class="{ active: index < questionNum }"
					@click="jumpNum(index)"
				></span>
			</view>

			<view class="knowledge-card-warp">
				<view class="knowledge-cards" :style="{ left: left + 'rpx' }">
					<view
						class="knowledge-card"
						v-for="(item, itemIndex) in questionList"
						:key="itemIndex"
					>
						<view class="title">
							<span>
								{{ item.title }}
							</span>
						</view>
						<view class="options">
							<view
								class="option"
								v-for="(option, index) in item.optionsData"
								@click="selectAnswer(option, index, itemIndex)"
								:class="{ active: isSelected(itemIndex, index) }"
							>
								{{ index }}. {{ option }}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="knowledge-buttons">
				<view
					class="previous"
					style="color: #fff; font-size: 14px; font-weight: 700"
					@click="pre"
				>
					上一题
				</view>
				<u-button type="primary" style="width: 200rpx" @click="submit">提交</u-button>
				<view
					class="next"
					style="color: #fff; font-size: 14px; font-weight: 700"
					@click="next"
				>
					下一题
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.knowledge-page {
		background: #8e2de2; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			rgb(142, 45, 226),
			rgb(74, 0, 224)
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			rgb(142, 45, 226),
			rgb(74, 0, 224)
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		.knowledge-warp {
			height: 1336rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;
			.knowledge-title {
			}
			.point {
				width: 600rpx;
				display: flex;
				justify-content: space-between;
				span {
					border-radius: 50%;
					width: 20px;
					height: 20px;
					transition: 0.3s;
					background-color: rgba(255, 255, 255, 0.4);
					&.active {
						background-color: rgba(255, 255, 255, 1);
					}
				}
			}
			.knowledge-card-warp {
				position: relative;
				width: 660rpx;
				height: 968rpx;
				overflow: hidden;
				.knowledge-cards {
					width: 7000rpx;
					position: absolute;
					top: 0%;
					display: flex;
					transition: 0.3s;
					justify-content: space-between;
					.knowledge-card {
						width: 600rpx;
						height: 900rpx;
						background-color: #fff;
						border-radius: 10px;
						padding: 5px;
						transition: 0.3s;
						.title {
							width: 100%;
							text-align: center;
							padding-top: 10px;
							padding-right: 10px;
							span {
								font-size: 18px;
								font-weight: 700;
							}
						}
						.options {
							width: 100%;
							text-align: center;
							.option {
								margin-left: auto;
								margin-right: auto;
								width: 80%;
								background-color: rgba(0, 0, 0, 0.1);
								font-weight: 700;
								border-radius: 5px;
								margin-top: 20px;
								line-height: 40px;
								transition: 0.3s;
								&.active {
									background: #7f0ff0; /* fallback for old browsers */
									background: -webkit-linear-gradient(
										to right,
										rgb(127, 0, 255),
										rgb(225, 0, 255)
									); /* Chrome 10-25, Safari 5.1-6 */
									background: linear-gradient(
										to right,
										rgb(127, 0, 255),
										rgb(225, 0, 255)
									); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
									color: #fff;
								}
							}
						}
					}
				}
			}

			.knowledge-buttons {
				width: 600rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
	@keyframes in {
		0% {
			left: 120%;
			top: -30%;
			transform: rotateZ(40deg);
		}
		100% {
			left: 0%;
			top: 0%;
			transform: rotateZ(0deg);
		}
	}
	@keyframes out {
		0% {
			left: 0%;
			top: 0%;
			transform: rotateZ(0deg);
		}
		100% {
			left: -150%;
			top: 60%;
			transform: rotateZ(-40deg);
		}
	}
</style>
