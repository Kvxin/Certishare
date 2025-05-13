<template>
	<view class="html_page">
		<uni-nav-bar
			:title="postData.title"
			fixed
			statusBar
			backgroundColor="#fff"
			left-icon="left"
			@clickLeft="back"
		></uni-nav-bar>
		<view class="html_title_info">
			<view class="html_title">
				{{ postData.title }}
			</view>
			<view class="html__post__times__type">
				<view class="html__post__times">
					{{ moment(postData.createAt).format('YYYY-MM-DD') }}
				</view>
				<view class="html__post__type">编程开发</view>
			</view>
		</view>
		<view class="html_user__info">
			<view class="html__user">
				<view class="left">
					<image :src="postData.author?.avatar" class="user-icon"></image>
				</view>
				<view class="center">
					<view class="username">
						{{ postData.author?.username || 'null' }}
					</view>
					<view class="user-personSignature">
						{{ postData.author?.personSignature || 'null' }}
					</view>
				</view>
				<view class="right"></view>
			</view>
		</view>
		<view class="html_body">
			<HtmlVue :html="postData.content" />
		</view>
		<view class="tags">
			<view class="tags-box" v-for="(item, index) in postData.tags" @click="jump(item)">
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import HtmlVue from '../../components/Html/Html.vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getPostInfo } from '../../api/post.js';
	import moment from 'moment';
	const tagStyle = ref({
		table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
		th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
		td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
		li: 'margin: 5px 0;'
	});
	const postData = ref({});
	const userInfo = ref();
	const getPost = (id) => {
		getPostInfo(id).then((res) => {
			postData.value = res.data;
			userInfo.value = res.data.author;
			console.log(postData);
		});
	};
	const back = () => {
		uni.navigateBack();
	};
	const jump = (e) => {
		uni.navigateTo({
			url: `/pages/posts-page/posts-page?id=${e}`
		});
	};
	onLoad((options) => {
		getPost(options.id);
		console.log(options.id);
	});
</script>

<style lang="scss">
	.html_page {
		width: 100%;
		.html_title_info {
			width: 100%;
			border-bottom: 1px solid #eee;
			.html_title {
				padding: 20px 15px 10px 15px;
				font-size: 18px;
				font-weight: 700;
				background-color: #fff;
				line-height: 30px;
			}
			.html__post__times__type {
				display: flex;
				padding: 5px;
				padding-left: 10px;
				width: 50%;
				justify-content: space-between;
				align-items: center;
				.html__post__times {
					color: #999;
				}
				.html__post__type {
					color: #0081ff;
				}
			}
		}
		.html_user__info {
			width: 100%;
			height: 120rpx;
			padding-left: 20px;
			.html__user {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				.left {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;
					.user-icon {
						width: 50px;
						height: 50px;
					}
				}
				.center {
					margin-left: 20px;
					.username {
						font-size: 15px;
						color: #8799a3;
					}
					.user-personSignature {
						color: #aaa;
					}
				}
			}
			border-bottom: 1px solid rgba(0, 0, 0, 0.02);
		}
		.html_body {
			border-bottom: 1px solid #eee;
		}
		.tags {
			padding: 0px;
			border-top: 1px solid #f9f9f9;
			padding-top: 15px;
			.tags-box {
				padding: 6px 12px;
				line-height: 20px;
				text-align: center;
				color: #0081ff;
				border: none;
				background-color: rgba(0, 129, 255, 0.2);
				width: auto;
				margin: 5px;
				border-radius: 15px;
				float: left;
				font-size: 12px;
				opacity: 0.9;
			}
		}
	}
</style>
