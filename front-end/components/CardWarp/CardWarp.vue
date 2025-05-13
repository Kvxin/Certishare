<script setup>
	import { ref, onMounted, getCurrentInstance } from 'vue';
	import { getCardList, getTypeList } from '../../api/card.js';
	import { systemStore } from '../../stores/systemStore.js';
	import CardVue from '../Card/Card.vue';
	const cardsData = ref([]);
	const leftColumnCards = ref([]);
	const rightColumnCards = ref([]);
	const height = ref(1000);
	const useSystemStore = systemStore();
	const cardNav = useSystemStore.getSystemNav;
	const isLodding = ref(false);
	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};
	let _this = getCurrentInstance();
	const getCardList_ = async () => {
		await getCardList().then((res) => {
			cardsData.value = res.data;
			cardsData.value = processImages(cardsData.value);
		});
	};
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
	const changeCardList = (e) => {
		if (e == '推荐') return;
		isLodding.value = true;
		getTypeList(e)
			.then((res) => {
				if (res.data.code == 200) {
					uni.showToast({
						title: '获取成功',
						icon: 'none'
					});
					cardsData.value = res.data.cardList;
					cardsData.value = processImages(cardsData.value);
					distributeCards();
					setTimeout(() => {
						getCardListWarpHeight();
					});
				} else {
					uni.showToast({
						title: `${res.data.error}`,
						icon: 'none'
					});
				}
			})
			.finally(() => {
				isLodding.value = false;
			});
	};
	const setupIntersectionObserver = () => {
		const observer = uni.createIntersectionObserver(_this, {
			thresholds: [0.9]
		});
		observer.relativeToViewport({ bottom: 20 });
		observer.observe('.load__more', (res) => {
			if (res.intersectionRatio > 0) {
				loadMore();
			}
		});
	};
	const loadMore = () => {
		getCardList().then((res) => {
			cardsData.value = [...cardsData.value, ...res.data];
			cardsData.value = processImages(cardsData.value);
			distributeCards();
			setTimeout(() => {
				getCardListWarpHeight();
			});
		});
	};
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
			})
			.exec();
	};
	const handleSwiperChange = (event) => {
		const currentIndex = event.detail.current;
		uni.$emit('changeNav', currentIndex);
	};
	onMounted(async () => {
		uni.$emit('showLodding');
		uni.$on('changeCardDatas', changeCardList);
		await getCardList_();
		distributeCards();
		setTimeout(() => {
			getCardListWarpHeight();
			uni.$emit('closeLodding');
			setupIntersectionObserver();
		});
	});
</script>

<template>
	<swiper :style="{ height: height + 150 + 'px' }" @change="handleSwiperChange">
		<swiper-item>
			<view class="card-warp">
				<div class="card-left">
					<!-- #ifdef MP-WEIXIN -->
					<CardVue
						v-for="(item, index) in leftColumnCards"
						:key="item.id"
						:cardInfo="item"
						@tap="jump(item._id)"
					/>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<CardVue
						v-for="(item, index) in leftColumnCards"
						:key="item.id"
						:cardInfo="item"
						@click="jump(item._id)"
						@tap="jump(item._id)"
					/>
					<!-- #endif -->
				</div>
				<div class="card-right">
					<!-- #ifdef MP-WEIXIN -->
					<CardVue
						v-for="(item, index) in rightColumnCards"
						:key="item.id"
						:cardInfo="item"
						@tap="jump(item._id)"
					/>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<CardVue
						v-for="(item, index) in rightColumnCards"
						:key="item.id"
						:cardInfo="item"
						@click="jump(item._id)"
					/>
					<!-- #endif -->
				</div>
			</view>
			<view class="load__more">加载更多</view>
		</swiper-item>
	</swiper>
</template>

<style lang="scss" scoped>
	.load__more {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
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
