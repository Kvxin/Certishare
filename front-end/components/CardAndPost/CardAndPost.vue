<script setup>
	import { ref, onMounted, getCurrentInstance, defineProps } from 'vue';
	import { systemStore } from '../../stores/systemStore.js';
	import CardVue from '../Card/Card.vue';
	import { getUserCardData } from '../../api/user.js';
	import { useUserStore } from '../../stores/userStore.js';
	const cardsData = ref([]);
	const leftColumnCards = ref([]);
	const rightColumnCards = ref([]);
	const height = ref(0);
	const useSystemStore = systemStore();
	const cardNav = useSystemStore.getSystemNav;
	const userStore = useUserStore().getUserData;
	let _this = getCurrentInstance();
	function distributeCards() {
		leftColumnCards.value = [];
		rightColumnCards.value = [];
		cardsData.value.forEach((card, index) => {
			if (index % 2 === 0) {
				leftColumnCards.value.push(card);
			} else {
				rightColumnCards.value.push(card);
			}
		});
	}
	const processImages = (cardsData) => {
		cardsData.forEach((card) => {
			if (card.images && card.images.length > 0) {
				card.images = card.images.map((imageUrl) => {
					return `${imageUrl}?imageMogr2/auto-orient/thumbnail/!30p/interlace/1/blur/1x0/quality/75`;
				});
			}
		});
		return cardsData;
	};
	const jump = (id) => {
		uni.navigateTo({
			url: `/pages/card-info/card-info?id=${id}`
		});
	};

	const getCardListWarpHeight = () => {
		const query = uni.createSelectorQuery().in(_this);
		query
			.select('.card-warp')
			.boundingClientRect((data) => {
				let newData = JSON.parse(JSON.stringify(data));
				height.value = newData.height;
				console.log(newData);
			})
			.exec();
	};
	onMounted(async () => {
		const users = uni.getStorageSync('userData');
		if (users) {
			getUserCardData(userStore.id).then((res) => {
				cardsData.value = res.data;
				distributeCards();
				setTimeout(() => {
					getCardListWarpHeight();
				});
			});
		} else {
			console.log('登陆了吗');
			return;
		}
	});
</script>

<template>
	<swiper :style="{ height: height + 150 + 'px' }" style="width: 100vw">
		<swiper-item>
			<view class="card-warp">
				<div class="card-left">
					<CardVue
						v-for="(item, index) in leftColumnCards"
						:key="item.id"
						:cardInfo="item"
						@click="jump(item._id)"
					/>
				</div>
				<div class="card-right">
					<CardVue
						v-for="(item, index) in rightColumnCards"
						:key="item.id"
						:cardInfo="item"
						@click="jump(item._id)"
					/>
				</div>
			</view>
		</swiper-item>
	</swiper>
</template>

<style lang="scss" scoped>
	.card-warp {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		background-color: #fff;
		.card-left {
			width: 48%;
			margin-left: -2px;
		}
		.card-right {
			width: 48%;
			margin-right: 5px;
		}
	}
</style>
