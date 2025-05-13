<template>
	<view class="search-result-input">
		<uni-nav-bar
			:fixed="true"
			shadow
			status-bar
			left-icon="left"
			left-text="返回"
			right-text="搜索"
			right-width="30px"
			@clickLeft="back"
			@clickRight="search"
			height="65px"
			class="nav-bar"
			:border="false"
			:gradientColors="['#ff9a9e', '#fad0c4']"
		>
			<view class="search-box">
				<u-search
					placeholder="点击进行搜索"
					shape="square"
					:clearabled="true"
					actionText=""
					:actionStyle="actionStyle"
					v-model="searchKey"
				></u-search>
			</view>
		</uni-nav-bar>
		<view class="search-result-data">{{ getCardNum }}</view>
		<SearchResultCardWarpVue :cardsDatas="cardsDatas" />
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, computed } from 'vue';
	import { getSarch } from '../../api/search.js';
	import SearchResultCardWarpVue from '../../components/SearchResultCardWarp/SearchResultCardWarp';

	const searchKey = ref('');
	const cardsDatas = ref([]);
	const getCardNum = computed(() => {
		return `获取到了${cardsDatas.value.length}条数据`;
	});
	const getSearchResult = async (searchText) => {
		getSarch(searchText).then((res) => {
			cardsDatas.value = res.data;
		});
	};
	const back = () => {
		uni.navigateBack();
	};
	onLoad((options) => {
		searchKey.value = options.searchKey;
		getSearchResult(searchKey.value);
	});
</script>

<style lang="scss" scoped>
	/* #ifdef MP-WEIXIN */
	body {
		transition: 0.1s all;
	}
	/* #endif */

	/* #ifndef MP-WEIXIN */
	* {
		transition: 0.1s all;
	}
	/* #endif */
	.nav-bar {
		background: #ee9ca7; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			rgb(238, 156, 167),
			rgb(255, 221, 225)
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			rgb(238, 156, 167),
			rgb(255, 221, 225)
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	.search-result-input {
		width: 750rpx;
		.search-box {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.search-result-data {
			margin: 10rpx;
			font-size: 24rpx;
		}
	}
</style>
