<script setup>
	import { defineProps, onMounted } from 'vue';
	const props = defineProps({
		commentData: Object
	});
</script>

<template>
	<view class="comments-warp">
		<view
			class="comment-list"
			v-for="(comment, index) in commentData"
			v-if="commentData.length"
			style="padding-left: 40rpx"
		>
			<view class="comment-face">
				<u-avatar :src="comment.commenter.avatar"></u-avatar>
			</view>
			<view class="comment-body">
				<view class="comment-top">
					<text>{{ comment.commenter.username }}</text>
				</view>
				<view class="comment-content">{{ comment.content }}</view>
				<view class="comment-date">
					<text>{{ comment.createdAt }}</text>
				</view>
			</view>
		</view>
		<!-- 没有评论显示这个 -->
		<view class="no-comment" v-if="!commentData.length">没有评论</view>
	</view>
</template>

<style lang="scss" scoped>
	.comments-warp {
		width: 100%;
		margin-top: 20rpx;
		background-color: #fff;
		.comment-list {
			width: 100%;
			display: flex;
			margin-top: 20rpx;
			position: relative;
			&::after {
				position: absolute;
				content: '';
				width: 90%;
				height: 1px;
				background-color: #eee;
				top: 100%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			.comment-body {
				margin-left: 10rpx;
				.comment-top {
					font-size: 12px;
					color: #444;
				}
				.comment-content {
					font-size: 14px;
					margin-top: 10rpx;
					width: 90%;
				}
				.comment-date {
					font-size: 12px;
					color: #999;
				}
			}
		}
		.no-comment {
			width: 750rpx;
			height: 300rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #666;
		}
	}
</style>
