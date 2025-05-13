<template>
	<view class="content">
		<NavWarp />
		<dragVue />

		<!-- #ifdef MP-WEIXIN -->
		<view style="margin-top: 240rpx" v-show="showIndex">
			<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view style="margin-top: 140rpx" v-show="showIndex">
		<!-- #endif -->
			<SearchWarp />
			<CarouselWarp />
			<!-- H5环境，设置offset-top为-1 -->
			<!-- #ifdef H5 -->
			<u-sticky offset-top="-1">
				<NavBarVue />
			</u-sticky>
			<!-- #endif -->

			<!-- 非H5环境，设置offset-top为68 -->
			<!-- #ifndef H5 -->
			<u-sticky offset-top="68">
				<NavBarVue />
			</u-sticky>
			<!-- #endif -->
			<CardWarp />
		</view>
		<view v-show="!showIndex" style="margin-top: 140rpx">
			<SearchWarp />
			<PostPageTopSwiperVue />
			<NoticeVue />
			<ArticleWarp />
		</view>
	</view>
	<view class="lodding" v-if="isLodding">
		<LoddingVue />
	</view>
</template>
<script setup>
	import { computed, ref } from 'vue';
	import { useCountStore } from '@/stores/counter.js';
	import { onPageScroll, onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
	import NavWarp from '../../components/NavWarp/NavWarp.vue';
	import SearchWarp from '../../components/SearchWarp/SearchWarp.vue';
	import CarouselWarp from '../../components/CarouselWarp/CarouselWarp.vue';
	import CardWarp from '../../components/CardWarp/CardWarp.vue';
	import NavBarVue from '../../components/NavBar/NavBar.vue';
	import dragVue from '../../components/drag/drag.vue';
	import PostPageTopSwiperVue from '../../components/PostPageTopSwiper/PostPageTopSwiper.vue';
	import NoticeVue from '../../components/Notice/Notice.vue';
	import ArticleWarp from '../../components/ArticleWarp/ArticleWarp.vue';
	import LoddingVue from '../../components/Lodding/Lodding.vue';

	const Topdistance = ref();
	const showIndex = ref(true);
	const isLodding = ref(false);
	const changePageData = (e) => {
		showIndex.value = e;
	};
	onPullDownRefresh(() => {
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 3000);
	});
	const showLodding = () => {
		isLodding.value = true;
	};
	const closeLodding = () => {
		isLodding.value = false;
	};
	onLoad(() => {
		uni.$on('change-page', (e) => {
			changePageData(e);
		});
		uni.getSystemInfo({
			success: (resu) => {},
			fail: (res) => {}
		});
		uni.$on('showLodding', () => {
			showLodding();
		});
		uni.$on('closeLodding', () => {
			closeLodding();
		});
	});
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin: 0 auto;
		position: relative;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.lodding {
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: 999999;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
