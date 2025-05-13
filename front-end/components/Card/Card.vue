<script setup>
	import { ref, defineProps, onMounted } from 'vue';
	const props = defineProps({
		cardInfo: Object
	});
	const imgList = ref(props.cardInfo.images || []);
	const author = props.cardInfo.author;
	const likeNumber = props.cardInfo.like;
	const title = props.cardInfo.title;
	const height = ref(Math.floor(Math.random() * (300 - 200) + 200));
	onMounted(() => {
		// console.log(props.cardInfo);
	});
</script>
<template>
	<view class="card">
		<view class="card-top">
			<view class="card-carouse" :style="{ height: height + 'px' }">
				<u-swiper :list="imgList" :height="height" :autoplay="false"></u-swiper>
			</view>
		</view>
		<view class="card-bottom">
			<view class="card-title">
				<view class="title">
					{{ title }}
				</view>
			</view>
			<view class="user-info">
				<view class="user-icon">
					<up-image
						:show-loading="true"
						:src="author.avatar"
						width="32px"
						height="32px"
						shape="circle"
					></up-image>
				</view>
				<view class="usernames">
					<text>{{ author.username }}</text>
				</view>
				<view class="like-number">
					<uni-icons type="heart" size="18"></uni-icons>
					<text>
						{{ likeNumber }}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	.title {
		font-weight: 700;
		color: #000;
	}
	.usernames {
		font-size: 22rpx;
	}
	.card {
		width: 100%;
		background-color: white;
		border-radius: 3px;
		padding: 5px;
		margin-top: 15rpx;
		box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
		.card-bottom {
			width: 95%;
			text-align: left;
			margin: 15rpx auto;
			font-size: 15px;
			.user-info {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;
			}
		}
	}
</style>
