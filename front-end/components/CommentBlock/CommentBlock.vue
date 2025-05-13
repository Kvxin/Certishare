<template>
	<view class="comment-block" v-if="isShow">
		<view class="mask" @click="hide"></view>
		<view class="c-block" :style="{ top: top + 'px' }">
			<view class="input">
				<u--textarea
					v-model="input"
					placeholder="我就知道你想说些什么~"
					class="comment-textarea"
					border="none"
					:focus="true"
					:adjust-position="true"
				></u--textarea>
				<view class="bottom">
					<span class="left-font">剩余{{ remainingCharacters }}字</span>
					<view class="btn">
						<u-button
							text="发送"
							type="primary"
							style="width: 20%; margin-top: 10px; margin-bottom: 10px"
							size="small"
							throttleTime="500"
							@click="send"
							:disabled="isDisabled"
						></u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, defineProps, onMounted, computed, watch } from 'vue';
	import { comSend } from '../../api/comment.js';
	const input = ref('');
	const isShow = ref(false);
	const loading = ref(false);
	const loadingText = '发送中';
	const isDisabled = ref(false);
	const top = 500;
	const props = defineProps({
		cardDatas: Object,
		userData: Object
	});

	const remainingCharacters = computed(() => {
		return 100 - input.value.length;
	});
	const init = () => {
		loading.value = false;
		isDisabled.value = false;
		input.value = '';
	};
	const clear = () => (input.value = '');
	const hide = () => {
		isShow.value = false;
	};
	const show = () => {
		isShow.value = true;
	};
	const send = () => {
		loading.value = true;
		isDisabled.value = true;
		const commentData = {
			cardId: props.cardDatas._id,
			userId: uni.getStorageSync('userData')._id || uni.getStorageSync('userData').id,
			commentBody: input.value
		};
		comSend(commentData)
			.then((res) => {
				hide();
				uni.$emit('reGetComment');
			})
			.finally(() => {
				init();
			});
	};
	watch(input, (newValue) => {
		if (newValue.length > 100) {
			uni.showToast({
				title: '输入超出限制，最多100字',
				icon: 'none',
				duration: 2000
			});
			input.value = newValue.slice(0, 100); // 截断超出的部分
		}
	});

	onMounted(() => {
		init();
		uni.$on('showMask', () => {
			show();
		});
	});
</script>

<style lang="scss">
	.comment-block {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0%;
		left: 0%;
		z-index: 3;
		.mask {
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.4);
			z-index: 100;
		}
		.c-block {
			width: 100%;
			height: 150px;
			position: fixed;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			transition: 0.5s;
			.input {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				.comment-textarea {
					width: 90%;
					background-color: #eee;
					margin-top: 10px;
				}
				.bottom {
					width: 80%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left-font {
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
</style>
