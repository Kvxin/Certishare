<template>
	<view class="message-page">
		<noDataVue />
	</view>
</template>

<script setup>
	import noDataVue from '../../components/noData/noData.vue';

	const back = () => {
		uni.navigateBack();
	};
</script>

<style lang="scss">
	.message-page {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
