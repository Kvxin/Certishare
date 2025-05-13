<script setup>
	import { ref, onMounted, onUnmounted } from 'vue';
	import PostPageTypeSelectVue from '../../components/PostPageTypeSelect/PostPageTypeSelect.vue';
	import { uploadImages } from '../../api/uploads.js';
	import { useUserStore } from '../../stores/userStore.js';
	import { createCard } from '../../api/card.js';
	const modalName = ref('');
	const imgList = ref([]); //图片上传
	const MAX_IMAGE_LENGHT = 9;
	const showSelectModel = ref(false);
	const fileNames = ref([]);
	const selectType = ref([]);
	const title = ref('');
	const content = ref('');
	const userStores = useUserStore();
	const userData = ref({});
	const login = ref();

	// 图片上传
	const ChooseImage = () => {
		uni.chooseImage({
			count: MAX_IMAGE_LENGHT, //默认9
			sizeType: ['original', 'compressed'],
			sourceType: ['album'],
			success: (res) => {
				if (imgList.value.length != 0) {
					imgList.value.concat(res.tempFilePaths);
				} else {
					imgList.value = res.tempFilePaths;
				}
			}
		});
	};

	const ViewImage = (e) => {
		uni.previewImage({
			urls: this.imgList,
			current: e.currentTarget.dataset.url
		});
	};
	const showTypeActionSheet = () => {
		showSelectModel.value = true;
	};

	// 删除照片
	const DelImg = (e) => {
		uni.showModal({
			title: '提示',
			content: '确定要删除这个照片吗？',
			cancelText: '再看看',
			confirmText: '删除',
			success: (res) => {
				if (res.confirm) {
					imgList.value.splice(e.currentTarget.dataset.index, 1);
					imgList.value = imgList.value;
				}
			}
		});
	};
	const submit = () => {
		if (checkLogin()) {
			if (title.value == '' || content.value == '' || imgList.value.length == 0) {
				uni.showToast({
					title: '请填写所有信息',
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: '正在上传图片'
			});
			uploadImages(imgList.value).then((res) => {
				fileNames.value = res.fileNames;
				uni.hideLoading();
				postCard();
			});
		} else {
			uni.showToast({
				title: '当前未登录',
				icon: 'none'
			});
		}
	};
	const postCard = async () => {
		const data = {
			imgList: fileNames.value,
			title: title.value,
			content: content.value,
			labels: selectType.value,
			authorId: userData.value.id
		};
		createCard(data).then((res) => {
			const id = res.data.cardId;
			uni.navigateTo({
				url: `/pages/card-info/card-info?id=${id}`
			});
		});
	};
	const checkLogin = () => {
		const user_ = uni.getStorageSync('userData');
		if (user_) {
			userData.value = user_;
		} else {
		}
		return user_ ? true : false;
	};
	// 拦截模态框滚动事件
	const modeMove = () => {
		// Implementation
	};
	onMounted(() => {
		uni.$on('setType', (e) => {
			e = e.map((e) => `#${e}`);
			selectType.value = e;
		});
		uni.$on('hide', () => {
			showSelectModel.value = false;
		});
		uni.$on('checkLogin', () => {
			checkLogin();
		});
	});

	onUnmounted(() => {
		// Code to run on component unmount
		uni.$off('setType');
		uni.$off('hide');
	});
</script>

<template>
	<view class="post-page">
		<form @submit="formSubmit" @reset="">
			<!-- 标题 -->
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input name="title" placeholder="输入卡片标题" v-model="title" />
			</view>
			<!-- end -->

			<!-- 内容 -->
			<view class="cu-form-group margin-top">
				<textarea
					@tap="getContentValue"
					name="content"
					maxlength="1000"
					placeholder="输入简介"
					v-model="content"
				></textarea>
			</view>
			<!-- end -->

			<view class="cu-form-group">
				<view class="title">分类:</view>
				<view class="types">
					<text v-for="(type, index) in selectType" :key="index">
						{{ type }}
					</text>
				</view>
				<button
					class="cu-btn bg-green"
					role="button"
					aria-disabled="false"
					data-target="DrawerModalL"
					@click="showTypeActionSheet"
				>
					选择
				</button>
			</view>

			<!-- 图片 -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">图片上传</view>
				<view class="action">{{ imgList.length }}/{{ MAX_IMAGE_LENGHT }}</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view
						class="bg-img"
						v-for="(item, index) in imgList"
						:key="index"
						@tap="ViewImage"
						:data-url="imgList[index]"
					>
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view
						class="solids"
						@tap="ChooseImage"
						v-if="imgList.length < MAX_IMAGE_LENGHT"
					>
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
			<!-- end -->

			<!-- 确定发布 -->
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" form-type="submit" @click="submit">
					确定发布
				</button>
			</view>
			<!-- end -->
		</form>
		<PostPageTypeSelectVue :showSelectModel="showSelectModel" />
	</view>
</template>

<style lang="scss">
	.post-page {
		width: 100%;
		position: relative;
	}

	.rule {
		display: flex;
		justify-content: space-between;
	}

	.margin-top-xl-170 {
		margin-top: 170rpx;
	}
</style>
