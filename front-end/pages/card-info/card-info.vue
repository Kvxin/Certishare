<template>
	<view class="card-pages">
		<view class="card-pages-user">
			<view class="user" @click="ToPersonPage">
				<view class="usericon">
					<u-image :src="author.avatar" height="48" width="48"></u-image>
				</view>
				<view
					style="
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					"
				>
					<view class="username">
						<span>{{ author.username }}</span>
					</view>
					<view class="time">
						<text style="font-size: 12px; color: ">
							<!-- {{ moment(cardDatas.createdAt).format('YYYY-MM-DD') }} -->
							{{ moment(Number(cardDatas.createdAt)).format('YYYY-MM-DD') }}
						</text>
					</view>
				</view>
			</view>
			<!-- 关注 -->
		</view>
		<!-- 轮播图部分 -->
		<view class="card-img-swiper">
			<u-swiper :list="images" :indicator="true" height="500"></u-swiper>
		</view>
		<view class="card-info">
			<view class="card-title">
				<span>{{ cardDatas.title }}</span>
			</view>
			<view class="card-content">
				{{ cardDatas.content }}
				<span class="labels">
					<span
						v-for="(tag, index) in cardDatas.tags"
						@click="JumpSearchTag(tag)"
						style="color: darkblue"
					>
						#{{ tag }}
					</span>
				</span>
			</view>
			<view class="card-times">
				<span>{{ Math.floor(Math.random() * 70) }} 浏览</span>
			</view>
		</view>
		<view
			class="line"
			style="width: 100%; display: flex; justify-content: center; margin: 15rpx"
		>
			<u-line length="90%"></u-line>
		</view>
		<view class="card-comment-warp">
			<view class="card-comment">
				<view class="all-comment" style="padding-left: 40rpx">
					<span>共{{ comment.length }}条评论</span>
				</view>
				<!-- <view class="input-comment">
					<view class="my-avatar">
						<u-avatar size="30" :src="userInfo.avatar"></u-avatar>
					</view>
				</view> -->
				<view class="comments">
					<CommentsWarp :commentData="comment"></CommentsWarp>
					<view class="loadMore">
						<span>——我也是有底线的~——</span>
					</view>
				</view>
			</view>
		</view>

		<view class="card-foot-warp">
			<view class="foot">
				<view class="user-icon" style="margin-left: 30rpx">
					<up-image
						:show-loading="true"
						shape="circle"
						width="32px"
						height="32px"
						:src="userData.avatar"
					></up-image>
				</view>
				<view class="foot-input" style="margin-left: 30rpx">
					<u-search
						placeholder="评论一句吧~"
						:disabled="true"
						search-icon="more-circle"
						actionText=""
						:showAction="false"
						@click="showMask"
					></u-search>
					<!-- <up-input
						placeholder="评论一句吧~"
						border="surround"
						disabled="true"
						suffixIcon="more-dot-fill"
						@click="showMask"
					></up-input> -->
				</view>
				<view class="foot-icon like" @click="addLike">
					<span class="iconfont-normal">&#xe726;</span>
				</view>
				<!-- <view
					class="foot-icon collect"
					:class="{ collected: isColletc }"
					@click="addCollect"
				>
					<i class="certishare-icon">
						<span>&#xe604;</span>
					</i>
				</view> -->
				<!-- <view class="foot-icon comment">
					<i class="certishare-icon">
						<span>&#xe891;</span>
						<span class="icon-text">{{ commentNum }}</span>
					</i>
				</view> -->
			</view>
		</view>
		<view class="card-page-mask" v-if="show" @click="hideMask"></view>
		<!-- <view class="float-window" :style="{ top: floatWindowTop + 'px' }">
			<span class="text">分享至</span>
			<view class="share-btns">
				<view class="share-btn">
					<view class="share-icon">
						<i class="certishare-icon">
							<span>&#xe841;</span>
						</i>
					</view>
					<view class="share-text">复制链接</view>
				</view>
			</view>
			<u-line></u-line>
			<view class="manage-btns">
				<view class="manage-btn" v-if="canDelete">
					<view class="manage-icon" @click="deleteCard">
						<i class="certishare-icon">
							<span>&#xe67e;</span>
						</i>
					</view>
					<view class="manage-text">删除</view>
				</view>
			</view>
		</view> -->
		<!-- 评论框 -->
		<CommentBlockVue :userData="userData" :cardDatas="cardDatas" />
	</view>
</template>

<script setup>
	import { useUserStore } from '@/stores/userStore.js';
	import { onLoad } from '@dcloudio/uni-app';
	import { getCardInfo, setLikeCard, addToWatchedHistory } from '@/api/card.js';
	import { getComment } from '../../api/comment.js';
	import { ref } from 'vue';
	import moment from 'moment';
	import image from '../../uni_modules/uview-plus/libs/config/props/image';
	import CommentsWarp from '../../components/CommentsWarp/CommentsWarp.vue';
	import CommentBlockVue from '../../components/CommentBlock/CommentBlock.vue';
	const author = ref({});
	const height = 300;
	const show = ref(false);
	const floatWindowTop = 1000;
	const cardDatas = ref({});
	const images = ref([]);
	const content = '确定要删除此卡片吗';
	const comment = ref([]);
	const isLike = true;
	const isColletc = false;
	const id = ref('');
	const username = '张三';
	const userStore = useUserStore();
	const userData = userStore.getUserData;
	const getInfo = () => {
		getCardInfo(id.value).then((res) => {
			cardDatas.value = res.data;
			comment.value = res.data.comment;
			author.value = res.data.author;
			images.value = res.data.images;
		});

		addToWatchedHistory(userData.id, id.value);
	};
	const formatTime = (timestamp) => {
		return moment(parseInt(timestamp)).format('YYYY-MM-DD HH:mm:ss');
	};
	const addLike = () => {
		const cardId = cardDatas.value._id;
		const userId = userData.id;
		setLikeCard(cardId, userId).then((res) => {
			console.log(res);
		});
	};
	const ToPersonPage = () => {};
	const _getComment = () => {
		getCardInfo(id.value).then((res) => {
			const commentData = res.data.comment;
			const formattedData = commentData.map((comment) => {
				comment.createdAt = formatTime(comment.createdAt);
				return comment;
			});
			comment.value = res.data.comment;
		});
	};

	const showMask = () => {
		console.log('gagga');
		uni.$emit('showMask');
	};
	onLoad((options) => {
		id.value = options.id;
		if (!userData) {
			uni.showToast({
				title: '未登录状态',
				icon: 'none'
			});
			uni.redirectTo({
				url: '/pages/login/login'
			});
			return;
		}
		getInfo();
		uni.$on('reGetComment', () => {
			_getComment();
		});
	});
</script>

<style lang="scss" scoped>
	.card-pages {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #fff;
		.card-pages-user {
			padding-left: 20px;
			background-color: #fff;
			width: 100%;
			height: 100rpx;
			// position: fixed;
			// top: 140rpx;
			// left: 0%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 1;
			margin-top: 20rpx;
			.user {
				display: flex;
				justify-content: center;
				align-items: center;
				.usericon {
					border-radius: 50%;
					overflow: hidden;
				}
				.username {
					font-size: 12px;
					color: #999;
					margin-left: 20rpx;
				}
			}
		}
		.follow {
			background: none;
			border: 0;
			box-sizing: border-box;
			padding: 5px 10px;
			background-color: rgba(14, 183, 218, 1);
			box-shadow: inset 0 0 0 2px rgba(14, 183, 218, 1);
			color: #fff;
			font-size: 12px;
			font-weight: 700;
			position: relative;
			vertical-align: middle;
		}
		.followed {
			background: none;
			border: 0;
			box-sizing: border-box;
			padding: 5px 10px;
			box-shadow: inset 0 0 0 2px rgba(14, 183, 218, 1);
			color: #0eb7da;
			font-size: 12px;
			font-weight: 700;
			position: relative;
			vertical-align: middle;
			box-shadow: inset 0 0 0 2px rgba(14, 183, 218, 0.4);
		}
		.card-img-swiper {
			margin: 30rpx auto;
			width: 684rpx;
			// margin-top: 180rpx;
		}
		.card-info {
			width: 100%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background-color: #fff;
			.card-title {
				width: 90%;
				font-weight: 700;
				font-size: 18px;
			}
			.card-content {
				width: 90%;
				font-size: 14px;
				letter-spacing: 1.1px;
				margin-top: 15rpx;
				.labels {
					margin-left: 15px;
					font-size: 12px;
					span {
						margin-left: 10rpx;
					}
				}
			}
			.card-times {
				width: 100%;
				span {
					margin-left: 50rpx;
					font-size: 12px;
					color: #666;
				}
			}
		}
		.card-comment-warp {
			width: 100%;
			background-color: #fff;
			// padding-left: 20px;
			.card-comment {
				// padding-left: 40rpx;
				.all-comment {
					width: 100%;
					color: #666;
					font-size: 12px;
				}
			}
			.input-comment {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.comments {
				.loadMore {
					margin-top: 30rpx;
					width: 100%;
					height: 120px;
					color: #999;
					display: flex;
					justify-content: center;
				}
			}
		}
		.card-foot-warp {
			width: 750rpx;
			height: 50px;
			position: fixed;
			background-color: #fff;
			bottom: 0%;
			display: flex;
			.foot {
				width: 90%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.foot-input {
					width: 60%;
				}
				.foot-icon {
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 700;
					height: 100%;
					width: 60px;
					span {
						font-size: 36rpx;
					}
				}
				.collected {
					color: yellow;
				}
			}
		}
		.card-page-mask {
			width: 100%;
			height: 100%;
			z-index: 5;
			background-color: rgba(0, 0, 0, 0.5);
			position: absolute;
			top: 0%;
			left: 0%;
		}
		.float-window {
			width: 100%;
			height: 200px;
			background-color: #fff;
			position: fixed;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 6;
			border-radius: 10px 10px 0 0;
			display: flex;
			align-items: center;
			flex-direction: column;
			transition: 0.5s;
			.text {
				font-size: 12px;
				color: #999;
				margin: 10px;
			}
			.share-btns {
				width: 80%;
				.share-btn {
					.share-icon {
						width: 50px;
						height: 50px;
						border-radius: 50%;
						background-color: #eee;
						display: flex;
						justify-content: center;
						align-items: center;
						i {
							span {
								font-size: 30px;
							}
						}
					}
					.share-text {
						font-size: 14px;
					}
				}
			}
			.manage-btns {
				width: 80%;
				.manage-btn {
					width: 50px;
					text-align: center;
					.manage-icon {
						width: 50px;
						height: 50px;
						border-radius: 50%;
						background-color: #eee;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 10rpx;
						i {
							span {
								font-size: 30px;
							}
						}
					}
					.manage-text {
						font-size: 14px;
						margin: 10rpx;
					}
				}
			}
		}
	}
</style>
