<script setup>
	import { ref, onMounted, getCurrentInstance, defineProps, watchEffect } from 'vue';
	import { getCardList } from '../../api/card.js';
	import { systemStore } from '../../stores/systemStore.js';
	import CardVue from '../Card/Card.vue';
	const cardsData = ref([]);
	const leftColumnCards = ref([]);
	const rightColumnCards = ref([]);
	const height = ref(1000);
	const useSystemStore = systemStore();
	const cardNav = useSystemStore.getSystemNav;
	const props = defineProps({
		cardsDatas: Object
	});

	let _this = getCurrentInstance();

	function distributeCards() {
		leftColumnCards.value = [];
		rightColumnCards.value = [];
		props.cardsDatas.forEach((card, index) => {
			if (index % 2 === 0) {
				leftColumnCards.value.push(card);
			} else {
				rightColumnCards.value.push(card);
			}
		});
	}
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
	watchEffect(() => {
		distributeCards(); // 当 cardsDatas 发生变化时，这里会重新执行
		setTimeout(() => {
			getCardListWarpHeight();
		});
	});

	const handleSwiperChange = (event) => {
		const currentIndex = event.detail.current;
		// 发送事件更新NavBar状态
		uni.$emit('changeNav', currentIndex);
	};
	onMounted(async () => {
		distributeCards();
		setTimeout(() => {
			getCardListWarpHeight();
		});
	});
</script>

<template>
	<swiper :style="{ height: height + 150 + 'px' }" @change="handleSwiperChange">
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
