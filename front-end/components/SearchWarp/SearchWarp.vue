<script setup>
	import { ref } from 'vue';
	const actionStyle = ref({
		display: 'none'
	});

	const jumpSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search'
		});
	};
</script>

<template>
	<view class="search-warp">
		<view class="search-box">
			<u-search
				placeholder="点击搜索"
				shape="square"
				:clearabled="true"
				disabled
				actionText=""
				:actionStyle="actionStyle"
				@click="jumpSearch"
			></u-search>
		</view>
	</view>
</template>
<style lang="scss" scoped>
	.search-warp {
		width: 100%;
	}
</style>
