<template>
	<swiper indicator-dots>
		<swiper-item v-for="(chunk, index) in chunkedList" :key="index" class="swiper-item">
			<view v-for="item in chunk" :key="item.name" class="icon-wrapper" @click="t(item)">
				<view :class="['t-icon', `t-icon-${item.name}`, 'icon']"></view>
				<view class="icon-name">{{ item.name }}</view>
			</view>
		</swiper-item>
	</swiper>
</template>

<script setup>
	import { ref, computed } from 'vue';
	const list = ref([
		{
			name: 'python'
		},
		{
			name: 'android'
		},
		{
			name: 'vim'
		},
		{
			name: 'cpp'
		},
		{
			name: 'django'
		},
		{
			name: 'go'
		},
		{
			name: 'json'
		},
		{
			name: 'php'
		},
		{
			name: 'powershell'
		},
		{
			name: 'sass'
		}
	]);
	const t = (e) => {
		uni.navigateTo({
			url: `/pages/posts-page/posts-page?id=${e.name}`
		});
	};
	const chunkedList = computed(() => {
		const result = [];
		const chunkSize = 8;
		for (let i = 0; i < list.value.length; i += chunkSize) {
			result.push(list.value.slice(i, i + chunkSize));
		}
		return result;
	});
</script>

<style>
	swiper {
		margin-top: 15rpx;
	}
	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: space-around;
	}
	.icon-wrapper {
		width: 22%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.icon {
		width: 100%;
		height: 50px;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		-webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));
		filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));
	}
	.icon-name {
		text-align: center;
		margin-top: 5px;
	}
</style>
