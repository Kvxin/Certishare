<template>
	<view class="myseeting-page" style="padding-top: 20px">
		<!-- 导航栏 -->
		<view class="myseeting-nav-warp">
			<view class="myseeting-nav">
				<view class="back">
					<i class="certishare-icon" @click="back">
						<span>x</span>
					</i>
				</view>
				<view class="text">
					<span>编辑个人资料</span>
				</view>
				<view class="sub-button">
					<u-button type="primary" size="mini" @click="submitInfo">提交</u-button>
				</view>
			</view>
		</view>

		<view class="seeting-header">
			<view class="header-bg">
				<image
					style="width: 100%; height: 100%; background-color: #eeeeee"
					:src="user.profileBackground"
					@click="changeProfileBackground"
				></image>
			</view>
		</view>
		<view class="seeting-body-warp">
			<view class="seeting-body">
				<view class="user-icon">
					<image
						style="width: 100%; height: 100%; background-color: #eeeeee"
						:src="user.avatar"
						@click="changeAvatar"
					></image>
				</view>
				<view class="informations-items">
					<u--form labelPosition="left" :model="user" ref="uForm">
						<!-- 姓名 -->
						<u-form-item label="姓名" prop="userInfo.username" borderBottom ref="item1">
							<u--input v-model="user.username" border="none"></u--input>
						</u-form-item>
						<!-- 性别 -->
						<u-form-item
							label="性别"
							borderBottom
							@click="
								showSex = true;
								hideKeyboard();
							"
						>
							<u--input
								v-model="user.gender"
								disabled
								disabledColor="#ffffff"
								placeholder="请选择性别"
								border="none"
							></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<!-- 个性签名 -->
						<u-form-item label="介绍" prop="userInfo.name" borderBottom ref="item1">
							<u--textarea
								v-model="user.personSignature"
								placeholder="请输入内容"
								count
								maxlength="120"
							></u--textarea>
						</u-form-item>
						<!--  -->
					</u--form>
					<!-- 选择性别拉框 -->
					<u-action-sheet
						:show="showSex"
						:actions="actions"
						title="请选择性别"
						@close="showSex = false"
						@select="sexSelect"
					></u-action-sheet>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { getUserData, updateUserInformation } from '../../api/user.js';
	import { ref, onMounted } from 'vue';
	import { useUserStore } from '../../stores/userStore.js';
	import { uploadImages } from '../../api/uploads.js';
	const userStore = useUserStore();
	const userInfo_ = userStore.getUserData;
	const user = ref({});
	const showSex = ref(false);
	const imagesTempURL = ref('');
	const actions = [
		{
			name: '男'
		},
		{
			name: '女'
		}
	];

	const sexSelect = (e) => {
		user.value.gender = e.name;
		console.log(user.value);
	};
	const back = () => {
		uni.navigateBack();
	};
	const changeAvatar = () => {
		uni.chooseImage({
			count: 1,
			success(res) {
				imagesTempURL.value = res.tempFilePaths[0];
				const imgList = [imagesTempURL.value];
				uploadImgPromise(imgList);
			}
		});
	};

	const uploadImgPromise = async (e) => {
		const res = await uploadImages(e);
		user.value.avatar = res.fileNames[0];
	};
	const changeProfileBackground = () => {
		uni.chooseImage({
			count: 1,
			success(res) {
				imagesTempURL.value = res.tempFilePaths[0];
				const imgList = [imagesTempURL.value];
				uploadBackGroundFilePromise(imgList);
			}
		});
	};
	const uploadBackGroundFilePromise = async (e) => {
		const res = await uploadImages(e);
		user.value.profileBackground = res.fileNames[0];
	};
	const setUser = (e) => {
		const data = {
			userData: e
		};
		userStore.updataUser(data);
	};
	const updata = async () => {
		const uid = userInfo_.uid;
		const data = updateUserInformation(uid, {
			username: user.value.username,
			gender: user.value.gender,
			avatar: user.value.avatar,
			profileBackground: user.value.profileBackground
		})
			.then((res) => {
				uni.showToast({
					title: '更新成功',
					icon: 'none'
				});
				setUser(res.data.updatedUser);
			})
			.catch((e) => {
				console.log('错了,', e);
			});
	};
	const submitInfo = async () => {
		uni.showLoading({
			title: '正在提交中...'
		});
		await updata();
	};
	const init = async () => {
		const userData = uni.getStorageSync('userData');
		const users = await getUserData(userData.id);
		user.value = users.data;
	};

	onMounted(() => {
		init();
	});
</script>

<style lang="scss">
	.myseeting-page {
		width: 750rpx;
		height: 100vh;
		position: relative;
		.myseeting-nav-warp {
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: center;
			.myseeting-nav {
				width: 90%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.back {
					i {
						font-size: 26px;
						font-weight: 700;
					}
				}
				.text {
					font-size: 14px;
					font-weight: 700;
				}
			}
		}
		.seeting-header {
			width: 100%;
			height: 250px;
			background-color: red;
			.header-bg {
				width: 100%;
				height: 100%;
				.seeting-background {
					width: 100%;
					height: 100%;
				}
			}
		}
		.seeting-body-warp {
			width: 100%;
			height: 500px;
			background-color: #fff;
			position: absolute;
			top: 32%;
			border-radius: 30px 30px 0 0;
			.seeting-body {
				width: 100%;
				height: 100%;
				position: relative;
				top: 0%;
				left: 0%;
				display: flex;
				justify-content: center;

				.user-icon {
					width: 80px;
					height: 80px;
					border-radius: 50%;
					border: 5px solid #fff;
					position: absolute;
					top: 0%;
					left: 50%;
					transform: translate(-50%, -50%);
					overflow: hidden;
				}

				.informations-items {
					width: 90%;
					height: 100%;
					padding-top: 50px;
					// background-color: red;
				}
			}
		}
	}
</style>
