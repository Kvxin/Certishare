<template>
	<view
		class="post-list"
		v-if="props.posts && props.posts.length > 0"
		style="margin-bottom: 100px"
	>
		<view
			class="post-list__item"
			v-for="(item, index) in props.posts"
			:key="index"
			@click="toPostDetail(item._id)"
		>
			<view class="post-list__item-status">
				<text class="post-list__item-status-text" v-if="item.popular == 1">热</text>
				<text class="post-list__item-status-text" v-if="item.sticky == 1">顶</text>
				<text class="post-list__item-status-text" v-if="item.featured == 1">精</text>
				<view class="post-list__item-title">{{ item.title }}</view>
			</view>

			<view class="post-list__item-content">{{ replaceHtmlTags(item.summary) }}</view>

			<view class="post-list__item-img" v-if="item.images.length > 0">
				<image
					v-for="(img, index) in item.images.slice(0, 3)"
					:key="index"
					:src="img"
					class="post-list__item-img-item"
					mode="aspectFill"
				/>
			</view>

			<view class="post-list__item-user">
				<view class="post-list__item-user-left">
					<image :src="item.author.avatar" class="post-list__item-user-avatar" />
					<view class="post-list__item-user-name">
						{{ getUserName(item.author.username) }}
						<text style="margin-left: 20upx">{{ formatDate(item.createdAt) }}</text>
					</view>
				</view>
				<view class="post-list__item-user-right">
					<view class="post-list__item-user-right-item">
						<u-icon name="eye-fill" color="#666" size="15"></u-icon>
						<text class="post-list__item-user-right-item-text">
							{{ item.views }}
						</text>
					</view>
					<view class="post-list__item-user-right-item">
						<u-icon name="thumb-up-fill" color="#666" size="15"></u-icon>
						<text class="post-list__item-user-right-item-text">
							{{ item.like }}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, defineProps, onMounted, watch, computed } from 'vue';
	import moment from 'moment';
	const props = defineProps({
		posts: Array
	});
	const getUserName = (name) => {
		if (name.length > 5) {
			return name.substring(0, 5) + '...';
		} else {
			return name;
		}
	};
	const formatDate = (date) => {
		return moment().format('YYYY-MM-DD');
	};
	const toPostDetail = (id) => {
		uni.navigateTo({
			url: '/pages/article/article?id=' + id
		});
	};
	const replaceHtmlTags = (text) => {
		var reg = /<[^<>]+>/g; // 全局匹配，过滤HTML标签
		text = text.replace(reg, ''); // 替换HTML标签
		text = text.replace(/&nbsp;/gi, ''); // 替换HTML空格
		return text;
	};
	watch(
		() => props.posts,
		(newData, oldData) => {
			console.log('更改了');
			console.log(props.posts);
		}
	);

	onMounted(() => {});
</script>
<style lang="scss" scoped>
	.post-list {
		padding: 20upx 30upx 0 30upx;
		background-color: #fff;
		margin-bottom: 50rpx;
		.post-list__item {
			padding-top: 25upx;
			padding-bottom: 25upx;
			border-bottom: 1upx solid #eee;

			.post-list__item-status {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 20upx;
				height: 42upx;

				.post-list__item-status-text {
					font-size: 20upx;
					color: #fff;
					background-color: #5ac725;
					padding: 5upx 10upx;
					border-radius: 5upx;
					margin-right: 10upx;
				}

				.post-list__item-title {
					font-size: 32upx;
					font-weight: bold;
					color: #333;
					/* 展示一行 多余的舍弃 */
					height: 42upx;
					overflow: hidden;
					margin-bottom: 6upx;
				}
			}

			.post-list__item-content {
				font-size: 28upx;
				color: #666;
				margin-bottom: 20upx;
			}

			.post-list__item-img {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;

				.post-list__item-img-item {
					width: 195upx;
					height: 195upx;
					margin-bottom: 20upx;
					border-radius: 10px;
					margin-right: 20upx;
				}
			}

			.post-list__item-video {
				margin-bottom: 20upx;

				.post-list__item-video-item {
					width: 100%;
					height: 400upx;
				}
			}

			.post-list__item-user {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.post-list__item-user-left {
					display: flex;
					flex-direction: row;
					align-items: center;

					.post-list__item-user-avatar {
						width: 30upx;
						height: 30upx;
						border-radius: 50%;
						margin-right: 20upx;
					}

					.post-list__item-user-name {
						font-size: 20upx;
						color: #666;
					}
				}

				.post-list__item-user-right {
					display: flex;
					flex-direction: row;
					align-items: center;

					.post-list__item-user-right-item {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-right: 20upx;

						.post-list__item-user-right-item-text {
							font-size: 20upx;
							color: #666;
							margin-left: 10upx;
						}
					}
				}
			}
		}
	}
</style>
