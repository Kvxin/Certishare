<template>
	<scroll-view
		class="scroll-view_H"
		scroll-with-animation
		scroll-x="true"
		scroll-left="120"
		:class="{ 'sticky-nav': isSticky }"
	>
		<view
			class="scroll-view-item_H"
			v-for="(item, index) in items"
			:class="{ active: item.isSelect }"
			@click="handleClick(index)"
		>
			{{ item.name }}
		</view>
	</scroll-view>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue';
	import { getNavData } from '../../api/info';
	import { systemStore } from '../../stores/systemStore.js';
	const items = ref([]);
	const isSticky = ref(false);
	const useSystemStore = systemStore();
	const handleClick = (selectedIndex) => {
		const key = items.value[selectedIndex].name;
		if (selectedIndex >= 4) {
		}
		items.value.forEach((item, index) => {
			item.isSelect = index === selectedIndex;
		});
		uni.$emit('changeCardDatas', key);
	};

	const addIsSelectToNavData = (navData) => {
		return navData.map((item) => ({
			...item,
			isSelect: false
		}));
	};
	const getNav = async () => {
		const nav = await getNavData();
		const { navData } = nav.data;
		items.value = addIsSelectToNavData(navData);
		useSystemStore.setNavBar(items.value);
		handleClick(0);
	};
	const stickyNav = () => {
		isSticky.value = true;
	};
	const noStickyNav = () => {
		isSticky.value = false;
	};
	onMounted(async () => {
		await getNav();
		uni.$on('stickyNav', () => {
			stickyNav();
		});
		uni.$on('noStickyNav', () => {
			noStickyNav();
		});
		uni.$on('changeNav', (e) => {
			handleClick(e);
		});
	});
	onUnmounted(() => {
		uni.$off('stickyNav', stickyNav);
		uni.$off('noStickyNav', noStickyNav);
		uni.$off('changeNav', handleClick);
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
	.sticky-nav {
		white-space: nowrap;
		width: 100%;
		background-color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		position: fixed;
		top: 0%;
		left: 0;
		z-index: 1000;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		background-color: #fff;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 25%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 26rpx;
	}
	.active {
		font-weight: 700;
		transform: scale(1.3);
	}
</style>
