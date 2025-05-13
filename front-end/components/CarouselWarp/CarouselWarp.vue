<!-- 轮播图组件 -->
<template>
	<view class="carousel-warp">
		<view class="carousel-box">
			<u-swiper
				:list="imgList"
				showTitle
				keyName="image"
				@click="click"
				indicator
				indicatorMode="line"
				circular
				height="300rpx"
			></u-swiper>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { getCarousel } from '../../api/Carousel.js';
	const imgList = ref([]);
	const swiperData = ref([]);
	const click = (e) => {
		const cardId = swiperData.value[e].cardId;
		uni.navigateTo({
			url: `/pages/card-info/card-info?id=${cardId}`
		});
	};
	const init = () => {
		swiperData.value.forEach((swiper) => {
			const imgData = {
				image: swiper.images[0].imageUrl,
				title: swiper.title
			};
			imgList.value.push(imgData);
		});
	};
	onMounted(() => {
		getCarousel().then((res) => {
			swiperData.value = res.data.data;
			init();
		});
	});
</script>
<style lang="scss">
	.carousel-warp {
		width: 100%;
		height: 300rpx;
		margin-top: 15rpx;
	}
</style>
