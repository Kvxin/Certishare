<template>
	<view class="search-post">
		<uni-nav-bar left-text="返回" :title="title" @clickLeft="back" />
		<view class="text" style="margin-top: 18rpx; margin-left: 18rpx; font-size: 22rpx">
			{{ `找到关于${id}的结果一共有 ${searchData.length} 条 ` }}
		</view>
		<view :class="{ 'search-posts-page': searchData.length == 0 }">
			<noDataVue v-if="searchData.length == 0" />
			<ArticlePropsWarpVue :posts="searchData" />
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { SarchPosts } from '../../api/search.js';
	import { ref } from 'vue';
	import noDataVue from '../../components/noData/noData';
	import ArticlePropsWarpVue from '../../components/ArticlePropsWarp/ArticlePropsWarp';

	const id = ref('');
	const searchData = ref([]);
	const title = ref(``);
	const back = () => {
		uni.navigateBack();
	};
	const init = () => {
		SarchPosts(id.value).then((res) => {
			searchData.value = res.data;
		});
	};
	onLoad((options) => {
		id.value = options.id;
		title.value = `搜索结果:${id.value}`;
		init();
	});
</script>

<style lang="scss">
	.search-posts-page {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}
	.search-post {
		width: 100%;
	}
</style>
