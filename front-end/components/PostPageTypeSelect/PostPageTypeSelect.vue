<template>
	<view class="select_type_model" v-if="showSelectModel">
		<view class="bg_mask" @click="hide"></view>
		<view class="select_model">
			<view class="model_title">设置标签</view>
			<view class="search_type">
				<u-search
					placeholder="搜索标签"
					v-model="typeText"
					borderColor="#eee"
					bgColor="#FFF"
				></u-search>
			</view>
			<view class="type_list_items">
				<view
					class="type_item"
					v-for="(item, index) in typeList"
					:key="index"
					:class="{ active: isActive(index) }"
					@click="toggleActive(index)"
				>
					<text>{{ item }}</text>
				</view>
			</view>
			<view class="selected_type_area">
				<view class="tips">当前选择的标签:</view>
				<view class="select_warp">
					<view
						class="select_type_item"
						v-for="(item, index) in selectedList"
						:key="index"
						@click="removeSelected"
					>
						{{ item }}
					</view>
				</view>
			</view>
			<view class="btn" style="width: 80%; margin-top: 28rpx">
				<up-button type="primary" :plain="true" text="确定" @click="sendType"></up-button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, defineProps } from 'vue';
	const showModel = ref(false);
	const typeText = ref('');
	const typeList = ref(['英语四级', '计算机设计大赛', '证书', '证', '证书', 'zheng']);
	const selectedList = ref([]);
	const activeIndexes = ref([]);
	const props = defineProps({
		showSelectModel: Boolean
	});
	const hide = () => {
		uni.$emit('hide');
	};
	const toggleActive = (index) => {
		if (activeIndexes.value.includes(index)) {
			// 如果已经激活，不再添加
			return;
		}
		if (selectedList.value.length < 4 && !selectedList.value.includes(typeList.value[index])) {
			selectedList.value.push(typeList.value[index]);
			activeIndexes.value.push(index);
		}
	};

	const isActive = (index) => {
		return activeIndexes.value.includes(index);
	};
	const removeSelected = (index) => {
		const removedItem = selectedList.value.splice(index, 1)[0];
		const typeIndex = typeList.value.indexOf(removedItem);
		const activeIndex = activeIndexes.value.indexOf(typeIndex);
		if (activeIndex > -1) {
			activeIndexes.value.splice(activeIndex, 1);
		}
	};
	const sendType = () => {
		uni.$emit('setType', selectedList.value);
		// showModel.value = false;
		hide();
	};
</script>

<style lang="scss">
	.select_type_model {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		.bg_mask {
			position: absolute;
			z-index: 9;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.3);
		}
		.select_model {
			z-index: 10;
			width: 90%;
			background-color: #fff;
			border-radius: 10px;
			padding: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.model_title {
				margin: 15rpx;
				font-size: 24rpx;
			}
			.search_type {
				width: 90%;
			}
			.type_list_items {
				margin-top: 18rpx;
				width: 95%;
				height: auto;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.type_item {
					font-size: 24rpx;
					border-radius: 20px;
					height: 26rpx;
					border: 1px solid #eee;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 24rpx;
					margin: 15rpx;
				}
				.active {
				}
			}
			.selected_type_area {
				width: 90%;
				.tips {
					font-size: 24rpx;
				}
				.select_warp {
					width: fit-content;
					height: auto;
					border-radius: 20px;
					border: 1px solid #eee;
					display: flex;
					transition: 0.3s all;
					.select_type_item {
						width: fit-content;
						font-size: 24rpx;
						border-radius: 20px;
						height: 26rpx;
						border: 1px solid #eee;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 24rpx;
						margin: 5rpx;
					}
				}
			}
		}
	}
</style>
