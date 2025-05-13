<template>
	<view class="post-list" v-if="list.length > 0" style="margin-bottom: 70px">
		<view
			class="post-list__item"
			v-for="(item, index) in list"
			:key="index"
			@click="toPostDetail(item.postid)"
		>
			<!-- 标题前方展示热顶精 等状态标签 和标题在一行 -->
			<view class="post-list__item-status">
				<text class="post-list__item-status-text" v-if="item.popular == 1">热</text>
				<text class="post-list__item-status-text" v-if="item.sticky == 1">顶</text>
				<text class="post-list__item-status-text" v-if="item.featured == 1">精</text>
				<view class="post-list__item-title">{{ item.title }}</view>
			</view>
			<!-- 定义内容 -->
			<view class="post-list__item-content">{{ replaceHtmlTags(item.content) }}</view>
			<!-- 当图片存在的时候展示 当超过三张则只展示三张不超过则直接循环 不存在则不展示任何图片信息 -->
			<view class="post-list__item-img" v-if="item.img_url.length > 0">
				<image
					v-for="(img, index) in item.img_url.slice(0, 3)"
					:key="index"
					:src="img"
					class="post-list__item-img-item"
					mode="aspectFill"
				/>
			</view>
			<!-- 当存在视频的时候展示 -->
			<view class="post-list__item-video" v-if="item.video_url">
				<video :src="item.video_url" class="post-list__item-video-item" controls />
			</view>
			<!-- 左边展示用户头像和用户名 右边展示访问数量、点赞数量、评论数量 -->
			<view class="post-list__item-user">
				<view class="post-list__item-user-left">
					<image :src="item.usertx" class="post-list__item-user-avatar" />
					<view class="post-list__item-user-name">
						{{ getUserName(item.nickname) }}
						<text style="margin-left: 20upx">{{ item.update_time_ago }}</text>
					</view>
				</view>
				<view class="post-list__item-user-right">
					<view class="post-list__item-user-right-item">
						<u-icon name="eye-fill" color="#666" size="15"></u-icon>
						<text class="iconfont iconyanjing"></text>
						<text class="post-list__item-user-right-item-text">
							{{ item.view }}
						</text>
					</view>
					<view class="post-list__item-user-right-item">
						<u-icon name="thumb-up-fill" color="#666" size="15"></u-icon>
						<text class="post-list__item-user-right-item-text">
							{{ item.thumbs }}
						</text>
					</view>
					<view class="post-list__item-user-right-item">
						<u-icon name="more-circle-fill" color="#666" size="15"></u-icon>
						<text class="post-list__item-user-right-item-text">
							{{ item.comment }}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { useUserStore } from '../../stores/userStore.js';
	import { getPostList } from '@/api/post.js';
	import { ref, onMounted } from 'vue';
	const userStore = useUserStore();
	const userInfo = userStore.getUserData;
	const postList = ref([]);
	const list = ref([]);
	const getPosts = () => {
		getPostList().then((res) => {
			postList.value = res.data;
			initData(postList.value, list.value);
		});
	};
	const getUserName = (name) => {
		if (name.length > 5) {
			return name.substring(0, 5) + '...';
		} else {
			return name;
		}
	};
	const toPostDetail = (id) => {
		uni.navigateTo({
			url: '/pages/article/article?id=' + id
		});
	};
	const initData = (postList, list) => {
		postList.forEach((post) => {
			const newItem = {
				postid: post._id,
				popular: post.popular,
				sticky: post.sticky,
				featured: post.featured,
				title: post.title,
				content: post.summary,
				img_url: post.images,
				usertx: post.authorDetails.avatar,
				nickname: post.authorDetails.username,
				update_time_ago: 'Just now',
				view: parseInt(post.views) || 0,
				thumbs: parseInt(post.like) || 0,
				comment: post.comments.length || 0
			};
			if (newItem.sticky) {
				list.unshift(newItem);
			} else {
				list.push(newItem);
			}
		});
	};

	const replaceHtmlTags = (text) => {
		var reg = /<[^<>]+>/g; //1、全局匹配g肯定忘记写,2、<>标签中不能包含标签实现过滤HTML标签
		text = text.replace(reg, ''); //替换HTML标签
		text = text.replace(/&nbsp;/gi, ''); //替换HTML空格
		text = text.replace(/<img*>/gi, '');
		text = text.replace(/<video*>/gi, '');
		return text;
	};
	onMounted(() => {
		getPosts();
	});
</script>
<style lang="scss" scoped>
	.post-list {
		padding: 20upx 30upx 0 30upx;
		background-color: #fff;

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
